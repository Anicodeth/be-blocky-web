"use client"
import { Edit3, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditChildSchema, editChildSchema } from "@/lib/schema/auth"
import { Input } from "../ui/input"




export const EditChildModal = () => {
    const form = useForm<EditChildSchema>({
        resolver: zodResolver(editChildSchema({ name: "Beeeeee", email: "b@gmail.com" }))
    })
    async function onSubmit(data: EditChildSchema) {

    }
    return (
        <Dialog>
            <DialogTrigger>
                <Edit3 size={16} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Child Info
                    </DialogTitle>
                    <DialogDescription>
                        Edit your child information, reset password and remove child.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="New Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )
                            }}
                        />
                        <Button variant="outline">
                            Edit Child Info
                        </Button>
                        <Button variant="destructive" className="gap-2">
                            <Trash2 size={14} /> Remove Child
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}