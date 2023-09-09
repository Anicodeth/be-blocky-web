import { getStudents } from "@/actions/parents";
import { SubscriptionModal } from "@/components/dialogs/subscribtion-modal";
import { ParentDashboard } from "@/components/parent-dashboard";


export default async function page() {
    const students = await getStudents()
    return (
        <div>
            <SubscriptionModal />
            {
                students?.student ? <ParentDashboard students={students.student} /> : null
            }
        </div>
    )
}