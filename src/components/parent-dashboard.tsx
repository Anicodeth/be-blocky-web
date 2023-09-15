"use client"
import { getDateString } from "@/lib/utils";
import { PageHeader } from "./page-header";
import { Student } from "@/types";
import { EmptyPlaceholder } from "./empty-placehoder";
import { AddChildModal } from "./dialogs/add-child-modal";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ChevronLeft, ChevronRight, Edit2, Edit3, Plus, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { StudentCard } from "./student-card";
import { useAuthContext } from "./context/auth-context";

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
                                <StudentCard student={student} key={student.name} />
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