"use client"
import { getDateString } from "@/lib/utils"
import { useAuthContext } from "./context/auth-context"
import { Label } from "./ui/label"

interface Props {
    title?: string
    description?: string
}

export function PageHeader({ title, description }: Props) {
    const { user } = useAuthContext()
    return (
        <div className=" border-b pb-6 border-ecstasy-300">
            <h2 className="text-ecstasy text-xl lg:text-4xl font-bold">
                {title ?? `Welcome Back, ${user?.displayName}`}
            </h2>
            <Label>
                {description ?? getDateString()}
            </Label>
        </div>
    )
}