import { PageHeader } from "@/components/page-header";
import { ProgressTabs } from "./client";
import { getDashboardData } from "@/actions/parents";
import { getSchools } from "@/actions/schools";


export default async function page() {
    const data = await getDashboardData();
    const school = await getSchools()
    return (
        <div>
            <PageHeader />
            <div className=" my-4">
                <ProgressTabs data={data} school={school} />
            </div>
        </div>
    )
}