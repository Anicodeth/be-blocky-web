import { PageHeader } from "@/components/page-header";
import { ProgressTabs } from "./client";
import { getDashboardData } from "@/actions/parents";
import { getSchools } from "@/actions/schools";
import { Student } from "@/types";


export default async function page() {
    const data = await getDashboardData();
    const school = await getSchools()
    let students: Student[] = []
    return (
        <div>
            <PageHeader />
            <div className=" my-4">
                <ProgressTabs data={data.role === "parent" ? data.student : students.concat(...school!.map(d => d.students))} />
            </div>
        </div>
    )
}