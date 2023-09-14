import { getDashboardData } from "@/actions/parents";
import { SubscriptionModal } from "@/components/dialogs/subscribtion-modal";
import { ParentDashboard } from "@/components/parent-dashboard";
import { SchoolDashboard } from "@/components/school-dashboard";
import { StudentDashboard } from "@/components/student-dashboard";


export default async function page() {
    const data = await getDashboardData()
    return (
        <div>
            <SubscriptionModal />
            {
                data.role === "parent" ? <ParentDashboard students={data.student} /> : data.role === "school" ? <SchoolDashboard classrooms={[{ name: "Class A" }]} /> : <StudentDashboard />
            }
        </div>
    )
}