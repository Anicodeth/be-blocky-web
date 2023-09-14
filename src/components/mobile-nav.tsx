"use client"
import Image from "next/image"
import Logo from "../../public/assets/images/logo.png"
import { LogOutIcon, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuthContext } from "./context/auth-context"
import { UserAvatar } from "./user-avatar"
import { Badge } from "./ui/badge"
import useUserSubscription from "@/hooks/use-subscription"
import { Label } from "@radix-ui/react-label"
import useGetFullUser from "@/hooks/use-full-user"
import { Button } from "./ui/button"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase/firebase-auth"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { SidebarNavItem } from "./side-bar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Icons } from "./icons"


export function MobileNav({ items }: { items: SidebarNavItem[] }) {
    const { userData } = useUserSubscription()
    const { userAccountData } = useGetFullUser()
    const router = useRouter()
    const [open, setOpen] = useState()
    const path = usePathname()
    const checkActive = (item: SidebarNavItem) => {
        return item.useInclude ? path?.includes(item.href ?? "") : path === item.href;
    };
    async function signOutUser() {
        await signOut(auth);
        await fetch("/api/sign-out", {
            method: "POST"
        })
        router.push("/")
    }

    return (
        <div className="md:hidden">
            <div className=" flex items-center justify-between mb-4">
                <div className=" flex items-center gap-2" >
                    <Sheet>
                        <SheetTrigger>
                            <Menu className=" text-brand-orange" />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>
                                    <Image
                                        src={Logo}
                                        alt="Beblocky logo"
                                        className="h-8 w-20 py-4"
                                        width={180}
                                        height={180}
                                    />
                                </SheetTitle>
                                <SheetDescription>
                                    {
                                        items.map(item => {
                                            const Icon = Icons[item.icon]
                                            return (
                                                (
                                                    <Link href={item.href} >
                                                        <span
                                                            className={cn(
                                                                " hover:text-accent-foreground transition-all duration-250 group flex items-center  py-2 text-sm font-medium",
                                                                checkActive(item) ? " border-r-5 border-brand-orange" : " opacity-50 transparent hover:border-r-5 hover:border-brand-orange/60",
                                                                item.disabled && "cursor-not-allowed opacity-80",
                                                            )}
                                                        >
                                                            <Icon className="mr-2 h-6 w-6" />
                                                            <span className=" text-xl">{item.title}</span>
                                                            {item.label && (
                                                                <span className=" ml-auto bg-gradient-to-tr from-purple-800 to-stone-800 bg-clip-text text-xs text-transparent dark:from-purple-300 dark:to-stone-200">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                        </span>
                                                    </Link>
                                                )
                                            )
                                        })
                                    }
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <Image
                        src={Logo}
                        alt="Beblocky logo"
                        width={90}
                        height={90}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className=" flex flex-col">
                            <div className=" flex items-center gap-2">
                                <UserAvatar />
                                <div className=" flex flex-col gap-1 items-center">
                                    <Badge className=" font-bold" variant={
                                        userData?.subscription === "Gold" ? "default" : userData?.subscription === "Premium" ? "secondary" : userData?.subscription === "Standard" ? "outline" : "outline"
                                    }>
                                        {userData?.subscription}
                                    </Badge>
                                    <Label className=" font-medium">
                                        {userAccountData?.role}
                                    </Label>
                                </div>
                            </div>

                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button size="sm" variant="secondary" className=" gap-2" onClick={signOutUser}>
                                Sign Out
                                <LogOutIcon size={14} />
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}