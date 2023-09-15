"use client"
import { useAuthContext } from "@/components/context/auth-context";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from 'react-hook-form';
import { z } from "zod";
export default function page() {
    const { user } = useAuthContext()
    const settingSchema = z.object({
        firstName: z.string(),
        lastName: z.string(),
        newPassword: z.string().optional(),
        email: z.string()
    })
    type SettingSchema = z.infer<typeof settingSchema>
    const form = useForm<SettingSchema>({
        resolver: zodResolver(settingSchema),
    })
    function onSubmit(data: SettingSchema) {

    }
    return (
        <div>
            <PageHeader title="Settings" />
            <div className=" mt-4">
                <h3 className=" text-lg md:text-3xl font-semibold">
                    Account Details
                </h3>
                <p className=" md:text-base text-xs">
                    Update your account details.
                </p>
            </div>
            <div className=" md:py-8 py-4">
                <div className=" flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                    <div className=" space-y-4 flex-grow">
                        <h3 className=" md:text-2xl font-semibold">
                            User Details
                        </h3>
                        <div className=" space-y-3">
                            <form className=" space-y-3">
                                <div className=" space-y-2">
                                    <Label className=" text-sm md:text-xl">
                                        First Name
                                    </Label>
                                    <Input className=" md:w-3/4" {...form.register("firstName")} defaultValue={user?.displayName?.split(" ")[0]} />
                                </div>
                                <div className=" space-y-2">
                                    <Label className=" text-sm md:text-xl">
                                        Last Name
                                    </Label>
                                    <Input className=" md:w-3/4"  {...form.register("lastName")} defaultValue={user?.displayName?.split(" ")[1]} />
                                </div>
                                <Button>
                                    Save Details
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className=" space-y-4 flex-grow">
                        <h3 className=" md:text-2xl font-semibold">
                            Password
                        </h3>
                        <div className=" space-y-3">
                            <form className=" space-y-3">
                                <div className=" space-y-2">
                                    <Label className=" text-sm md:text-xl">
                                        Old Password
                                    </Label>
                                    <PasswordInput placeholder="old password" className=" md:w-3/4" />
                                </div>
                                <div className=" space-y-2">
                                    <Label className=" text-sm md:text-xl">
                                        New Password
                                    </Label>
                                    <PasswordInput placeholder="new password" className=" md:w-3/4" />
                                </div>
                            </form>
                            <Button>
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=" border-t border-ecstasy-200 mt-8">
                    <div className=" py-6 flex flex-col space-y-2">
                        <h3 className=" text-2xl font-semibold">
                            Email
                        </h3>
                        <Input className=" md:w-5/12" defaultValue={user?.email ?? ""} />
                    </div>
                </div>
                <Button>
                    Save Changes
                </Button>
            </div>
        </div>
    )
}