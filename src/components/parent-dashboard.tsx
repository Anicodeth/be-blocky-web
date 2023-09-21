"use client"
import { Student } from "@/types";
import { useAuthContext } from "./context/auth-context";
import { AddChildModal } from "./dialogs/add-child-modal";
import { EmptyPlaceholder } from "./empty-placehoder";
import { PageHeader } from "./page-header";
import { StudentCard } from "./student-card";

interface Props {
    students: Student[]
}

export function ParentDashboard({ students }: Props) {
    const { user } = useAuthContext()
    return (
        <div>
            <PageHeader />
            <div className=" py-4 flex items-center justify-between">
                <h2 className=" font-heading text-xl lg:text-3xl">
                    Children
                </h2>
                <AddChildModal another />
            </div>
            {
                students.length ?
                    <div>
                        {
                            students.map(student => (
                                <StudentCard student={student} key={student.name} classrooms={[]} />
                            ))
                        }
                    </div>
                    : <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name="Student" />
                        <EmptyPlaceholder.Title>
                            No Children Added
                        </EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You haven't added any of your child yet. Start adding your children.
                        </EmptyPlaceholder.Description>
                        <AddChildModal />
                    </EmptyPlaceholder>
            }
        </div>
    )
}