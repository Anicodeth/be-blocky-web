"use client"
import Image from "next/image"
import { ReactNode } from "react"
import Banner from "../../../public/assets/images/default-register.png"
import Logo from "../../../public/assets/images/logo.png"
import { Tabs, Tab } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import { tabStyle } from "@/lib/style"
interface Props {
    children: ReactNode
}
export default function authLayout({ children }: Props) {
    const pathname = usePathname()
    const router = useRouter()
    return (
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-x-12 lg:mb-0 w-full h-full">
            <div>
                <Image
                    src={Logo}
                    alt="Beblocky logo"
                    className=" p-4"
                    width={200}
                    height={200}
                />
                <div className="flex flex-col justify-center items-center mt-10 mb-6">
                    <h2 className="lg:text-7xl text-2xl font-bold font-heading tracking-tight mb-4 text-ecstasy">Hi, there!</h2>
                    <p className=" mb-6 text-dark-ebony font-medium">
                        Welcome to BeBlocky Dashboard
                    </p>
                </div>
                <div className=" flex items-center justify-center">
                    <div className="flex flex-col w-max">
                        <Tabs aria-label="Options" size="lg" selectedKey={pathname} variant="solid" radius="full" classNames={tabStyle} onSelectionChange={(key) => {
                            router.push(key.toString())
                        }}>
                            <Tab key="/sign-in" title="Sign In">
                                {
                                    pathname === "/sign-in" && children
                                }
                            </Tab>
                            <Tab key="/sign-up" title="Register">
                                {
                                    pathname === "/sign-up" && children
                                }
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Image
                src={Banner}
                alt=""
                className=" hidden md:block lg:block h-screen w-auto"
            />
        </div>
    )
}