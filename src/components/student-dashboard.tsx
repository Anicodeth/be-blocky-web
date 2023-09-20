import { Course } from "@/hooks/user-courses";
import { PageHeader } from "./page-header";


export function StudentDashboard({ courses }: { courses: Course[] }) {
    return (
        <div>
            <PageHeader />

        </div>
    )
}