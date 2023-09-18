"use client";
import { useAuthContext } from "@/components/context/auth-context";
import { PageHeader } from "@/components/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";
import { updateEmailSetting, updatePasswordSetting, updateUserSetting } from "@/actions/setting";
import firebase_app from '@/lib/firebase/firebase-client';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const userSettingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const passwordSettingSchema = z.object({
  newPassword: z.string(),
});

const emailSettingSchema = z.object({
  email: z.string().email(),
});

export default function page() {
  const { user } = useAuthContext();
  const router = useRouter();
  const auth = getAuth(firebase_app)
  const { toast } = useToast()

  type UserSettingSchema = z.infer<typeof userSettingSchema>;
  const userSettingForm = useForm<UserSettingSchema>({
    resolver: zodResolver(userSettingSchema),
  });
  function onUserSettingSubmit(data: UserSettingSchema) {
    updateUserSetting({ userId: user?.uid as string, ...data });
  }

  type PasswordSettingSchema = z.infer<typeof passwordSettingSchema>;
  const passwordSettingForm = useForm<PasswordSettingSchema>({
    resolver: zodResolver(passwordSettingSchema),
  });
  function onPasswordSettingSubmit(data: PasswordSettingSchema) {
    updatePasswordSetting({ userId: user?.uid as string, ...data });
    auth.signOut()
    router.push("/sign-in")
    toast({
      title: "Login again",
      description: "Login again with the new password.",
      duration: 7000
    })
  }

  type EmailSettingSchema = z.infer<typeof emailSettingSchema>;
  const emailSettingForm = useForm<EmailSettingSchema>({
    resolver: zodResolver(emailSettingSchema),
  });
  function onEmailSettingSubmit(data: EmailSettingSchema) {
    console.log(data);
    updateEmailSetting({ userId: user?.uid as string, ...data });
    auth.signOut()
    router.push("/sign-in")
    toast({
      title: "Login again",
      description: "Login again with the new email.",
      duration: 7000
    })
  }

  return (
    <div>
      <PageHeader title="Settings" />
      <div className=" mt-4">
        <h3 className=" text-lg md:text-3xl font-semibold">Account Details</h3>
        <p className=" md:text-base text-xs">Update your account details.</p>
      </div>
      <div className=" md:py-8 py-4">
        <div className=" flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
          <div className=" space-y-4 flex-grow">
            <h3 className=" md:text-2xl font-semibold">User Details</h3>
            <div className=" space-y-3">
              <Form {...userSettingForm}>
                <form
                  className=" space-y-3"
                  onSubmit={userSettingForm.handleSubmit(onUserSettingSubmit)}
                >
                  <FormField
                    control={userSettingForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className=" space-y-2">
                        <Label className=" text-sm md:text-xl">
                          First Name
                        </Label>
                        <Input
                          className=" md:w-3/4"
                          {...field}
                          defaultValue={user?.displayName?.split(" ")[0]}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={userSettingForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className=" space-y-2">
                        <FormLabel className=" text-sm md:text-xl">
                          Last Name
                        </FormLabel>
                        <Input
                          className=" md:w-3/4"
                          {...field}
                          defaultValue={user?.displayName?.split(" ")[1]}
                        />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Details</Button>
                </form>
              </Form>
            </div>
          </div>
          <div className=" space-y-4 flex-grow">
            <h3 className=" md:text-2xl font-semibold">Password</h3>
            <div className=" space-y-3">
              <Form {...passwordSettingForm}>
                <form
                  className=" space-y-3"
                  onSubmit={passwordSettingForm.handleSubmit(
                    onPasswordSettingSubmit
                  )}
                >
                  <FormField
                    control={passwordSettingForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className=" space-y-2">
                        <Label className=" text-sm md:text-xl">
                          New Password
                        </Label>
                        <PasswordInput
                          placeholder="new password"
                          className=" md:w-3/4"
                          {...field}
                        />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Change Password</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        <div className=" border-t border-ecstasy-200 mt-8">
          <Form {...emailSettingForm}>
            <form
              className=" space-y-3"
              onSubmit={emailSettingForm.handleSubmit(onEmailSettingSubmit)}
            >
              <FormField
                control={emailSettingForm.control}
                name="email"
                render={({ field }) => (
                  <div className=" py-6 flex flex-col space-y-2">
                    <Label className=" text-2xl font-semibold">Email</Label>
                    <Input
                      className=" md:w-5/12"
                      {...field}
                      defaultValue={user?.email ?? ""}
                    />
                  </div>
                )}
              />
              <Button>Save Changes</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
