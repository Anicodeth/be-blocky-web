import { addCourse } from "@/actions/student"
import useCourses from "@/hooks/user-courses"
import { guid } from "@/lib/utils"
import { Student } from "@/types"
import { Plus, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"



export const AddCourseModal = ({ student }: { student: Student }) => {
    const [courseBox, setCourseBox] = useState<{ id: string, courseId: string | undefined }[]>(student.courses?.filter(c => c).map((c) => ({ id: guid(), courseId: c })) ?? [])
    const { courses } = useCourses()
    async function add() {
        const courses = courseBox.filter(d => d)
        console.log(courses)
        await addCourse(student.userId, courses.map(d => d.courseId!))
    }
    return (
        <Dialog>
            <DialogTrigger>
                <div role="button" className=" flex items-center gap-2 text-green-700 font-semibold text-xs bg-green-100 p-1 px-2">
                    <Plus size={12} />
                    Add
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add More Courses
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className=" space-y-2">
                    <Button type="button" size="sm" className=" flex items-center gap-2" onClick={() => setCourseBox(prev => [...prev, { id: guid(), courseId: undefined }])}>
                        Add Course
                        <Plus size={16} />
                    </Button>
                    {
                        courseBox.map(box => (
                            <div key={box.id}>
                                <Select onValueChange={(v) => {
                                    if (v === "remove") {
                                        setCourseBox(prev => [...prev.filter(p => p.id !== box.id)])
                                        return add()
                                    }
                                    setCourseBox(prev => [...prev.filter(p => p.id !== box.id), { id: box.id, courseId: v }])
                                    add()
                                }} value={box.courseId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map(course => (
                                            <SelectItem value={course._id.toString()} key={course._id}>
                                                {course.courseTitle}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="remove" className=" border-t rounded-none">
                                            <div className=" flex items-center gap-2">
                                                <X size={14} className="text-red-600" />
                                                <span className=" text-red-600">
                                                    Remove
                                                </span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ))
                    }
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}