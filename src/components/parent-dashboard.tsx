import { getDateString } from "@/lib/utils";
import { PageHeader } from "./page-header";
import { Student } from "@/types";
import { EmptyPlaceholder } from "./empty-placehoder";
import { AddChildModal } from "./dialogs/add-child-modal";

interface Props {
    students: Student[]
}

export function ParentDashboard({ students }: Props) {
    return (
        <div>
            <PageHeader
                title="Welcome back"
                description={getDateString()}
            />
            <div className=" py-4">
                <h2 className=" font-heading text-3xl">
                    Children
                </h2>
            </div>
            {
                students.length ?
                    <div>
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