"use client"
import { getDateString } from "@/lib/utils";
import { PageHeader } from "./page-header";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { tabStyle } from "@/lib/style";
import { ClassroomCard } from "./classroom-card";
import { Classroom, Student } from "@/types";
import SearchBar from "./search-bar";
import { AddChildModal } from "./dialogs/add-child-modal";
import { AddClassModal } from "./dialogs/add-class-modal";
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
                        <div className="flex md:items-center flex-col md:flex-row gap-2 py-4">
                            {students.map(student => (
                                <StudentCard student={student} key={student.name} />
                            ))}
                        </div>
                    </Tab>
                    <Tab key="class" title="Class">
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