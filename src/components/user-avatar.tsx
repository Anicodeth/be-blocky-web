"use client"
import { cn } from "@/lib/utils"
import { useAuthContext } from "./context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export const UserAvatar = ({ className, profile }: { className?: string, profile?: { photoURL?: string, displayName: string } }) => {
    const { user: currentUser } = useAuthContext()
    const user = profile ?? currentUser
    return (
        <Avatar className={cn("w-8 h-8", className)}>
            {user?.photoURL ? (
                <AvatarImage src={user.photoURL} alt={user.displayName ?? "Profile picture"} />
            ) : null}
            <AvatarFallback className={cn("flex items-center justify-center w-8 h-8 overflow-hidden border border-orange-400 text-gray-700 bg-gray-100 rounded-full", className)}>
                {(user?.displayName ?? "U").slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}