"use client"
import { tabStyle } from "@/lib/style";
import { Classroom, Student } from "@/types";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { ClassroomCard } from "./classroom-card";
import { AddChildModal } from "./dialogs/add-child-modal";
import { AddClassModal } from "./dialogs/add-class-modal";
import { EmptyPlaceholder } from "./empty-placehoder";
import { PageHeader } from "./page-header";
import SearchBar from "./search-bar";
import { StudentCard } from "./student-card";



export function SchoolDashboard({ data }: { data: { classRoom: Classroom, students: Student[] }[] }) {
    const pathname = usePathname()
    const array: Student[] = []
    const students = array.concat(...data.map(d => d.students))
    return (
        <div>
            <PageHeader />
            <div className="my-4 flex flex-col">
                <Tabs aria-label="Options" size="lg" variant="solid" radius="full" classNames={{
                    ...tabStyle,
                    base: "flex flex-col items-center"
                }}>
                    <Tab key="student" title="Students" className="">
                        <div className=" w-full md:gap-4 md:space-y-0 space-y-2 md:flex items-center justify-between">
                            <SearchBar className=" p-0 flex-grow" />
                            <AddChildModal isSchool classrooms={data.map(cls => cls.classRoom)} />
                        </div>
                        {
                            !students.length && <div className="py-4">
                                <EmptyPlaceholder>
                                    <EmptyPlaceholder.Icon name="Student" />
                                    <EmptyPlaceholder.Title>
                                        No Children Added
                                    </EmptyPlaceholder.Title>
                                    <EmptyPlaceholder.Description>
                                        You haven't added any of your child yet. Start adding your children.
                                    </EmptyPlaceholder.Description>
                                    <AddChildModal />
                                </EmptyPlaceholder>
                            </div>
                        }
                        <div className=" py-4 flex items-start gap-2">
                            {
                                students.map(student => (
                                    <StudentCard student={student} classrooms={data.map(d => d.classRoom)} />
                                ))
                            }
                        </div>
                    </Tab>
                    <Tab key="class" title="Classrooms">
                        <div className=" w-full md:gap-4 md:space-y-0 space-y-2 md:flex items-center justify-between">
                            <SearchBar className=" p-0 flex-grow" />
                            <AddClassModal />
                        </div>
                        <div className="flex items-center gap-2 py-4">
                            {
                                data.map(classRoom => (
                                    <ClassroomCard key={classRoom.classRoom.name} classroom={classRoom.classRoom} />
                                ))
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}