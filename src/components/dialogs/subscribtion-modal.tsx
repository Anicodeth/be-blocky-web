"use client"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "../ui/dialog"
import useUserSubscription from "@/hooks/use-subscription"
import { Card, CardContent, CardDescription, CardTitle, CardFooter, CardHeader } from "../ui/card"
import { useAuthContext } from "../context/auth-context"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site-config"
import { Loading } from "../loading"
import { useRouter } from "next/navigation"
import { makePayment } from "@/lib/chapa/initate"


const paymentPlans = [
    { title: "Free", price: 0, description: "You can try it for free and upgrade later.", cta: "Continue" },
    { title: "Standard", price: 1000, description: "Unlocks access to some of our best courses." },
    { title: "Gold", price: 2500, description: "Provides access to premium courses.", highlight: true },
    { title: "Premium", price: 5000, description: "For the best learning experience." }
]

export const SubscriptionModal = () => {
    const [openLocal, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const subscription = useUserSubscription()
    const router = useRouter()
    const { user } = useAuthContext()
    useEffect(() => {
        setOpen(subscription.userData === null)
    }, [subscription.userData])

    async function subscribeToPlan(plan: typeof paymentPlans[0]) {
        setIsLoading(true)
        if (plan.price === 0) {

        }
        const paymentData = {
            first_name: user?.displayName?.split(" ")[0] || "First Name",
            last_name: user?.displayName?.split(" ")[1] || "Last Name",
            amount: plan.price,
            email: user?.email || "email@email.com",
            return_url: `${siteConfig.url}/dashboard`
        }
        const checkoutUrl = await makePayment(paymentData, user?.uid ?? "")
        if (!checkoutUrl) {
            setIsLoading(false)
            return
        }
        setIsLoading(false)
        router.push(checkoutUrl)
    }
    return (
        <Dialog open={openLocal} onOpenChange={setOpen}>
            <DialogTrigger asChild>
            </DialogTrigger>
            <DialogContent className=" max-w-4xl">
                <DialogTitle className=" text-2xl text-brand-orange font-bold font-heading">
                    Hey, {user?.displayName}
                </DialogTitle>
                <DialogDescription className=" text-lg font-medium">
                    Choose a plan to continue
                </DialogDescription>
                <div className=" grid grid-cols-2 gap-2">
                    {
                        paymentPlans.map(plan => (
                            <Card key={plan.title} className={cn("flex-grow", plan.highlight && " border border-brand-orange/20 shadow-lg shadow-orange-300/20")}>
                                <CardHeader>
                                    <CardTitle className=" flex items-center justify-between">
                                        {plan.title}
                                        <p className=" text-orange-600">
                                            {plan.highlight && "Popular"}
                                        </p>
                                    </CardTitle>
                                    <CardDescription className=" break-words overflow-hidden">
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className=" text-xl">
                                        ETB {plan.price}
                                    </CardTitle>
                                </CardContent>
                                <CardFooter>
                                    <Button onClick={() => subscribeToPlan(plan)} disabled={isLoading}>
                                        {plan.cta ?? "Choose Plan"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))
                    }

                </div>
            </DialogContent>
        </Dialog >
    )
}