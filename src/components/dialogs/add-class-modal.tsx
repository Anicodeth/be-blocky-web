"use client"
import { addClass } from "@/actions/schools"
import useCourses from "@/hooks/user-courses"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthContext } from "../context/auth-context"
import { Loading } from "../loading"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


export const AddClassModal = () => {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button>
                    Add Classroom
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    Add New Classroom
                </DialogHeader>
                <DialogDescription>
                    <AddClassForm setOpen={setOpen} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export const AddClassForm = ({ setOpen }: { setOpen: (state: boolean) => void }) => {
    const { user } = useAuthContext()
    const [isLoading, setIsLoading] = useState(false)
    const schema = z.object({
        name: z.string(),
        courses: z.array(z.string())
    })
    type Schema = z.infer<typeof schema>
    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        defaultValues: {
            courses: []
        }
    })
    const router = useRouter()
    async function onSubmit(data: Schema) {
        setIsLoading(true)
        await addClass(user!.uid, data.name, courseBox.map(d => d.courseId ?? ""))
        setIsLoading(false)
        router.refresh()
        setOpen(false)
    }
    const [courseBox, setCourseBox] = useState<{ courseId: string | undefined }[]>([])
    const { courses } = useCourses()
    const selectedCourses = form.getValues("courses")
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input {...field} placeholder="Classroom Name" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="courses"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Button type="button" variant="secondary" size="sm" className=" flex items-center gap-2" onClick={() => setCourseBox(prev => [...prev, { courseId: undefined }])}>
                                    Add Course
                                    <Plus size={16} />
                                </Button>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {
                    courseBox.map(box => (
                        <div key={box.courseId}>
                            <Select onValueChange={(v) => {
                                const course = courseBox.find(c => c.courseId === v)
                                if (course) setCourseBox(prev => [...prev.filter(p => p.courseId !== v), course])
                                else setCourseBox(prev => [...prev.filter(p => p.courseId), { courseId: v }])
                            }} value={box.courseId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.filter(c => !selectedCourses.includes(c._id.toString())).map(course => (
                                        <SelectItem value={course._id.toString()} key={course._id}>
                                            {course.courseTitle}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ))
                }
                <Button className=" mt-4">
                    {isLoading ? <Loading /> : "Add Class"}
                </Button>
            </form>
        </Form>
    )
}