"use client"
import { getDateString } from "@/lib/utils";
import { PageHeader } from "./page-header";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { tabStyle } from "@/lib/style";
import { ClassroomCard } from "./classroom-card";
import { Classroom } from "@/types";
import SearchBar from "./search-bar";
import { AddChildModal } from "./dialogs/add-child-modal";



export function SchoolDashboard({ classrooms }: { classrooms: Classroom[] }) {
    const pathname = usePathname()
    return (
        <div>
            <PageHeader />
            <div className="my-4 flex flex-col">
                <Tabs aria-label="Options" size="lg" variant="solid" radius="full" classNames={{
                    ...tabStyle,
                    base: "flex flex-col items-center"
                }}>
                    <Tab key="student" title="Students" className=" flex md:items-center flex-col md:flex-row">
                        <div className=" w-full md:gap-4 md:space-y-0 space-y-2 md:flex items-center justify-between">
                            <SearchBar className=" p-0 flex-grow" />
                            <AddChildModal isSchool />
                        </div>
                    </Tab>
                    <Tab key="teachers" title="Teachers">
                        <p>
                            Teachers
                        </p>
                    </Tab>
                </Tabs>
            </div>
        </div>
    )
}