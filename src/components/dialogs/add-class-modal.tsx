"use client"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import { addClass } from "@/actions/schools"
import { useAuthContext } from "../context/auth-context"
import { Loading } from "../loading"


export const AddClassModal = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    Add Class
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Add New Class
                </DialogHeader>
                <DialogDescription>
                    <AddClassForm />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export const AddClassForm = () => {
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const schema = z.object({
        name: z.string()
    })
    type Schema = z.infer<typeof schema>
    const form = useForm<Schema>({
        resolver: zodResolver(schema)
    })
    async function onSubmit(data: Schema) {
        setIsLoading(true)
        await addClass(user!.uid, data.name)
        setIsLoading(false)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button>
                    {isLoading ? <Loading /> : "Add Class"}
                </Button>
            </form>
        </Form>
    )
}