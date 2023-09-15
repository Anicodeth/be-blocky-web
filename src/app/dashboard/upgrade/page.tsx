import { PageHeader } from "@/components/page-header";
import { tabStyle } from "@/lib/style";
import { Tab, Tabs } from "@nextui-org/react";
import { UpgradeTab } from "./client";




export default function page() {
    return (
        <div>
            <PageHeader />
            <div className=" flex flex-col items-center justify-center py-4 md:py-8">
                <div className="space-y-2">
                    <h2 className="text-3xl text-center md:text-5xl font-bold">
                        Best Plans For You
                    </h2>
                    <p className=" text-center text-sm md:text-base">
                        You can upgrade your membership for additional feature
                    </p>
                </div>
            </div>
            <div className=" w-full flex-col flex items-center justify-center">
                <UpgradeTab />
            </div>
        </div>
    )
}