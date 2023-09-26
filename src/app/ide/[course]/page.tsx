import IdePage from "@/components/ide/ide-page";
import { Course, Slide } from "@/hooks/user-courses";

export default async function page({ params }: { params: { course: string } }) {
    const courses = await fetch("https://beb-blocky-ide.vercel.app/api/v1/courses").then(async (res) => await res.json()).then(res => res.courses as Course[])
    const course = courses?.find(c => c._id.toString() === params.course)
    const slides: Slide[] = []
    course?.lessons.map(d => slides.push(...d.slides))
    if (!slides?.length) {
        return null
    }
    return <IdePage slides={slides} courseId={course?._id ?? 0} />
}