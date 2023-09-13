import { toast } from "@/components/ui/use-toast"
import { siteConfig } from "@/config/site-config"
import firebase_app from "@/lib/firebase/firebase-client"
import { PaymentData } from "@/types"
import axios from "axios"
import { FirebaseApp } from "firebase/app"
import { collection, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore"
import { nanoid } from "nanoid"
import { Plan, plans } from "./plans"
import { addSubscription } from "@/actions/subscription"



export interface UserPaymentData {
    first_name: string
    last_name: string
    email: string
    amount: number
    return_url: string
}

interface CheckoutWrapper {
    checkout_url: string
}

export interface ChapaResponse {
    message: string
    status: "success" | "failed"
    data: CheckoutWrapper
}


export const makePayment = async (paymentData: UserPaymentData, userId: string, plan: Plan, yearly: boolean) => {
    const txRef = "TX-" + nanoid();
    const realPaymentData: PaymentData = {
        ...paymentData,
        currency: "ETB",
        tx_ref: txRef,
        callback_url: `${siteConfig.url}/api/verify/${txRef}`,
        "customization[title]": "Beblocky, Inc.",
        "customization[description]": "BeBlocky subscription."
    }
    try {
        const res = await axios.post("/api/chapa-payment/", realPaymentData).then(res => res.data)
        await addSubscription({
            userId,
            plan,
            yearly,
            paymentInfo: {
                txRef,
                email: paymentData.email
            }
        })
        return res.response.data.checkout_url as string
    } catch (e: any) {
        toast({
            title: e.message
        })
    }
}