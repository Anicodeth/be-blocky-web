import { getStudents } from "@/actions/parents";
import { SubscriptionModal } from "@/components/dialogs/subscribtion-modal";
import { ParentDashboard } from "@/components/parent-dashboard";
import { StudentDashboard } from "@/components/student-dashboard";


export default async function page() {
    const students = await getStudents()
    console.log(students)
    return (
        <div>
            <SubscriptionModal />
            {
                students.role === "parent" ? <ParentDashboard students={students.student} /> : <StudentDashboard />
            }
        </div>
    )
}