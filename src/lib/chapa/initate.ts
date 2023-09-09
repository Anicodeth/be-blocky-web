import { toast } from "@/components/ui/use-toast"
import { siteConfig } from "@/config/site-config"
import firebase_app from "@/lib/firebase/firebase-client"
import { PaymentData } from "@/types"
import axios from "axios"
import { FirebaseApp } from "firebase/app"
import { collection, doc, getDoc, getFirestore, query, setDoc, where } from "firebase/firestore"
import { nanoid } from "nanoid"



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

export const subscriptionPlans: { [key: number]: string } = {
    0: "Free",
    1000: "Standard",
    2_500: "Gold",
    5_000: "Premium",
    10_000: "Standard Yearly",
    25_000: "Gold Yearly",
    50_000: "Premium Yearly"
}


export const makePayment = async (paymentData: UserPaymentData, userId: string) => {
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
        const firestore = getFirestore(firebase_app as FirebaseApp);

        const userSubscriptionsRef = doc(firestore, "UserSubscriptions", userId);
        await setDoc(userSubscriptionsRef, {
            uid: userId,
            subscription: subscriptionPlans[paymentData.amount],
            tx_ref: realPaymentData.tx_ref,
            email: paymentData.email,
            verified: false,
            expiry_date: subscriptionPlans[paymentData.amount]!.includes("Yearly") ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        });
        return res.response.data.checkout_url as string
    } catch (e: any) {
        toast({
            title: e.message
        })
    }
}