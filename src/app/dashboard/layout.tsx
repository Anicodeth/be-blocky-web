import { PageHeader } from "@/components/page-header";
import { SideBar } from "@/components/side-bar";
import { getDateString } from "@/lib/utils";
import { Home } from "lucide-react";
import { ReactNode } from "react";


interface Props {
    children: ReactNode
}


export default function layout({ children }: Props) {
    return (
        <main className="grid md:grid-cols-5 min-h-screen bg-brand-light-green">
            <aside className="hidden h-screen  flex-col md:flex md:sticky md:top-0">
                <SideBar items={[{
                    title: "Dashboard",
                    href: "/dashboard",
                    icon: "Home"
                }, {
                    title: "Progress",
                    href: "/progress",
                    icon: "Progress"
                }, {
                    title: "Courses",
                    href: "/courses",
                    icon: "Courses"
                }, {
                    title: "Upgrade Plan",
                    href: "/upgrade",
                    icon: "Cart"
                }, {
                    title: "Support",
                    href: "/support",
                    icon: "Support"
                }, {
                    title: "Setting",
                    href: "/settings",
                    icon: "Settings"
                }]} />
            </aside>
            <main className=" col-span-4 bg-white rounded-l-3xl p-8 px-16">

                {children}
            </main>
        </main>
    )
}