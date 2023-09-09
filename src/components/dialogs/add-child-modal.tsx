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
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-auth";
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from "firebase/app";
import { useAuthContext } from "../context/auth-context";
import { toast } from "../ui/use-toast";
import useGetFullUser from "@/hooks/use-full-user";
import { createChild } from "@/actions/children";
import { PlusCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-viewport";

const db = getFirestore(firebase_app as FirebaseApp)

interface Props {
    another?: boolean
}

export function AddChildModal({ another }: Props) {
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<AddChildSchema>({
        resolver: zodResolver(addChildSchema)
    })
    const [open, setOpen] = useState(false)
    const { userAccountData } = useGetFullUser()
    const isMobile = useIsMobile()
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {
                    another ? <Button className=" flex items-center gap-2" size={isMobile ? "sm" : "default"} variant="secondary">
                        <PlusCircle size={16} />
                        Add Another Child
                    </Button> : <Button>
                        Add Child
                    </Button>
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Child</DialogTitle>
                    <DialogDescription>Let's crate an account for your child.
                    </DialogDescription>
                </DialogHeader>
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
                        <Button className=" w-full text-lg mt-4" type="submit" disabled={isLoading}>
                            {
                                isLoading ? <Loading /> : "Add Child"
                            }
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}