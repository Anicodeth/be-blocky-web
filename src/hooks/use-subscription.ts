import { useAuthContext } from "@/components/context/auth-context";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from 'firebase/app';
import useGetFullUser from "./use-full-user";

interface UserSubscriptionData {
    email: string
    expiry_date: Date
    subscription: string
    tx_ref: string
    uid: string
    verified: boolean
}

const useUserSubscription = () => {
    const { user } = useAuthContext();
    const [userData, setUserData] = useState<UserSubscriptionData | null | undefined>();
    const [isLoading, setLoading] = useState(true);
    const { userAccountData } = useGetFullUser()

    useEffect(() => {
        if (user && userAccountData) {
            const fetchUserSubscription = async () => {
                const userId = userAccountData.role === "Student" ? userAccountData.parentId : user.uid;
                const db = getFirestore(firebase_app as FirebaseApp);
                const userSubscriptionsRef = doc(db, "UserSubscriptions", userId);
                try {
                    const docSnap = await getDoc(userSubscriptionsRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const userFetchedData: UserSubscriptionData = {
                            email: data.email,
                            expiry_date: data.expiry_date.toDate(),
                            subscription: data.subscription,
                            tx_ref: data.tx_ref,
                            uid: data.uid,
                            verified: data.verified
                        }
                        setUserData(userFetchedData);
                    } else {
                        setUserData(null);
                    }
                } catch (error) {
                    setUserData(null);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserSubscription();
        } else {
            setLoading(false);
            setUserData(undefined);
        }
    }, [user, userAccountData]);

    return { userData, isLoading };
};

export default useUserSubscription;
