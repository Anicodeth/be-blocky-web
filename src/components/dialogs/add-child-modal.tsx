"use client"
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { AddChildSchema, addChildSchema } from '@/lib/schema/auth';
import { errorToast } from "@/lib/error-toast";
import { Loading } from "../loading";
import { FormEvent, useState } from "react";
import { User, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from "firebase/app";
import { useAuthContext } from "../context/auth-context";
import { toast } from "../ui/use-toast";
import useGetFullUser from "@/hooks/use-full-user";
import { createChild, createStudent, getUserByEmail } from "@/actions/student";
import { CheckIcon, PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-viewport";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";

const db = getFirestore(firebase_app as FirebaseApp)

interface Props {
    another?: boolean
    isSchool?: boolean
}

export function AddChildModal({ another, isSchool }: Props) {
    const [open, setOpen] = useState(false)
    const isMobile = useIsMobile()
    const [accountType, setAccountType] = useState<"new" | "existing">()
    const name = isSchool ? "Student" : "Child"
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    another ? <Button className=" flex items-center gap-2" size={isMobile ? "sm" : "default"} variant="secondary">
                        <PlusCircle size={16} />
                        Add Another {isSchool ? "Student" : "Child"}
                    </Button> : <Button>
                        Add {name}
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add {name}</DialogTitle>
                    <DialogDescription>Let's crate an account for your {name.toLowerCase()}.
                    </DialogDescription>
                </DialogHeader>
                <DialogDescription className=" space-y-2">
                    <DialogTitle>
                        Do your {name.toLowerCase()} already have an account?
                    </DialogTitle>
                    <div className=" flex gap-2 items-center mt-2">
                        <Button variant={accountType === "existing" ? "default" : "outline"} onClick={() => setAccountType("existing")}>
                            Yes
                        </Button>
                        <Button variant={accountType === "new" ? "default" : "outline"} onClick={() => setAccountType("new")}>
                            No
                        </Button>
                    </div>
                </DialogDescription>
                {
                    accountType === "new" ? <RegisterForm setOpen={setOpen} /> : accountType === "existing" ? <AlreadyRegistered setOpen={setOpen} /> : null
                }
            </DialogContent>
        </Dialog>
    )
}

export const AlreadyRegistered = ({ setOpen }: { setOpen: (state: boolean) => void }) => {
    const [email, setEmail] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [foundUser, setFoundUser] = useState<User>()
    const { userAccountData } = useGetFullUser()
    const { user } = useAuthContext()
    const name = userAccountData?.role === "school" ? "Student" : "Child"
    async function onSubmit(e: FormEvent) {
        e.preventDefault()
        try {
            if (email) {
                setIsLoading(true)
                const validate = z.string().email()
                validate.parse(email)
                const user = await getUserByEmail(email)
                if (!user.data) {
                    setIsLoading(false)
                    return toast({
                        title: "Error finding user by email!",
                        description: user.error,
                        variant: "destructive"
                    })
                }
                setFoundUser(user.data)
                setIsLoading(false)
            }
        } catch (e) {
            setIsLoading(false)
            toast({
                title: "Error finding user by email!",
                description: "Please register them as a new user if they don't have account with beblocky yet!",
                variant: "destructive"
            })
        }
    }
    async function onAddStudent() {
        setIsLoading(true)
        const className = userAccountData?.role === "parent" ? "Class A" : "Students"
        try {
            if (!foundUser) throw Error("User not found")
            await createStudent({
                parentId: user?.uid as string,
                studentName: foundUser.displayName as string,
                studentEmail: foundUser.email as string,
                studentId: foundUser.uid,
                className
            })
            setIsLoading(false)
            setOpen(false)
            toast({
                title: `${name} Added Successfully!`,
                description: `A ${name.toLowerCase()} is added successfully they can login with the provided credential to access courses now!`
            })
        } catch (error: any) {
            setIsLoading(false)
            toast({
                title: error?.message ?? "Error happened while adding a student"
            })
            console.error(error)
        }
    }
    return (
        <div>
            <form className=" flex flex-col gap-2" onSubmit={onSubmit}>
                {
                    !foundUser ? <>
                        <Label className=" font-semibold">
                            Registered Email
                        </Label>
                        <Label className=" text-xs text-stone-700">
                            Email address linked with your {name.toLowerCase()} account
                        </Label>
                    </> : null
                }
                {foundUser ? <Label>
                    <strong className=" font-bold">{foundUser.displayName}</strong> is found with this email.
                </Label> : null}
                <Input disabled={!!foundUser} placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                {
                    !foundUser ? <Button disabled={isLoading || !!foundUser}>
                        {isLoading ? <Loading /> : "Find Child/Student"}
                    </Button> : <Button onClick={onAddStudent}>
                        Add Student/Child
                    </Button>
                }
                {
                    foundUser ? <Button variant="link" size="sm" className="underline" onClick={() => setFoundUser(undefined)}>Find Another {name}</Button> : null
                }
            </form>
        </div>
    )
}

export const RegisterForm = ({ setOpen }: { setOpen: (state: boolean) => void }) => {
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const { userAccountData } = useGetFullUser()
    const isParent = userAccountData?.role === "parent"
    const form = useForm<AddChildSchema>({
        resolver: zodResolver(addChildSchema)
    })
    const classrooms = [{ name: "Class A", uid: "classA" }, { name: "Class B", uid: "classB" }]
    async function onSubmit(data: AddChildSchema) {
        setIsLoading(true)
        const className = userAccountData?.role === "parent" ? "Class A" : "Students"
        try {
            await createChild({ email: data.email, password: data.password, parentId: user!.uid, displayName: data.name, className })
            setIsLoading(false)
            setOpen(false)
            toast({
                title: "Child Added Successfully!",
                description: "A child is added successfully they can login with the provided credential to access courses now!"
            })
        } catch (error: any) {
            setIsLoading(false)
            toast({
                title: error?.message ?? "Error happened while adding a student"
            })
            console.error(error)
        }
    }
    return (
        <Form {...form}>
            <form className=" space-y-4" onSubmit={form.handleSubmit(onSubmit, errorToast)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Full Name" className=" h-10" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Email" className=" h-10" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} onChange={(e) => {
                                    field.onChange(e)
                                }} placeholder="Password" type="password" className=" h-10" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Repeat Password" type="password" className=" h-10" />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="classroom"
                    render={({ field }) => {
                        return (
                            <FormItem className=" w-full">
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className="justify-between"
                                                aria-expanded={true}
                                            >
                                                {form.getValues("classroom")?.length ? form.getValues("classroom") : "Select Classroom"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0 min-w-full">
                                            <Command>
                                                <CommandInput placeholder="Search classroom..." className="h-9" />
                                                <CommandEmpty>No classroom found.</CommandEmpty>
                                                <CommandGroup>
                                                    {classrooms.map((classroom) => (
                                                        <CommandItem
                                                            key={classroom.name}
                                                            onSelect={(currentValue) => form.setValue("classroom", currentValue === form.getValues("classroom") ? "" : currentValue)}
                                                            className="cursor-pointer"
                                                        >
                                                            {classroom.name}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    form.getValues("classroom") === classroom.uid ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />
                <Button className=" w-full mt-4" type="submit" disabled={isLoading}>
                    {
                        isLoading ? <Loading /> : isParent ? "Add Child" : "Add Student"
                    }
                </Button>
            </form>
        </Form>
    )
}