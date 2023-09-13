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
import { useRouter } from "next/navigation"


export function MobileNav() {
    const { userData } = useUserSubscription()
    const { userAccountData } = useGetFullUser()
    const router = useRouter()

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
                    <Menu className=" text-brand-orange" />
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