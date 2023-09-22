"use client"
import { getDateString } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "./context/auth-context"
import { Label } from "./ui/label"

interface Props {
    title?: string
    description?: string
    showBackBtn?: boolean
}

export function PageHeader({ title, description, showBackBtn }: Props) {
    const { user } = useAuthContext()
    const router = useRouter()
    return (
        <div className=" border-b pb-6 border-ecstasy-300 sticky top-0 z-30 bg-white">
            <h2 className="text-ecstasy text-xl lg:text-4xl font-bold">
                {title ?? `Welcome Back, ${user?.displayName}`}
            </h2>
            <Label>
                {description ?? getDateString()}
            </Label>
            {
                showBackBtn && <nav onClick={() => router.back()} className=" flex items-center gap-2 mt-2 cursor-pointer w-min">
                    <ChevronLeft />
                    <span className="font-medium">
                        Back
                    </span>
                </nav>
            }
        </div>
    )
}