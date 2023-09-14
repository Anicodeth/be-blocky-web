"use client"

import { ChevronRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Classroom } from "@/types";
import { useIsMobile } from "@/hooks/use-viewport";
import { EditChildModal } from "./dialogs/edit-child-modal";
import { CopyButton } from "./ui/copy-button";



export function ClassroomCard({ classroom }: { classroom: Classroom }) {
    const isMobile = useIsMobile()
    return (
        <Card className="rounded-2xl lg:w-1/4">
            <CardHeader className=" text-white p-6 bg-gradient-to-tr from-lime-600 to-lime-500 rounded-t-2xl">
                <div className=" border-b pb-2">
                    <p className=" font-medium text-sm">
                        Classroom
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="font-medium pt-4">
                        {classroom.name}
                    </p>
                    <EditChildModal />
                </div>
                <div className=" flex items-center">
                    <Button size="sm" className="text-xs" variant="secondary">
                        <CopyButton value={classroom.name} />
                        Copy Class Code
                    </Button>
                    <div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className=" mt-4 flex items-center justify-between border-b pb-4">
                    <div>
                        <p className=" text-sm font-bold">
                            Members
                        </p>
                    </div>
                    <div role="button" className=" flex items-center gap-2 text-green-700 font-semibold text-xs bg-green-100 p-1 px-2">
                        <Plus size={12} />
                        Add
                    </div>
                </div>
                <div className=" mt-2 space-y-2">
                    <p className=" text-sm font-bold">
                        Course
                    </p>
                    <p className=" font-medium">
                        Website Development
                    </p>
                </div>
                <Button className=" gap-4 py-4 mt-4">
                    <span className=" font-semibold text-xs">
                        VIEW PROGRESS
                    </span>
                    <ChevronRight />
                </Button>
            </CardContent>
        </Card>
    )
}