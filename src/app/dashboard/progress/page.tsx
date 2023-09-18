import { PageHeader } from "@/components/page-header";
import { ProgressTabs } from "./client";


export default function page() {
    return (
        <div>
            <PageHeader />
            <div className=" my-4">
                <ProgressTabs />
            </div>
        </div>
    )
}