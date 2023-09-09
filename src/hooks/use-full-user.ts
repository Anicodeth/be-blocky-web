import { useAuthContext } from "@/components/context/auth-context";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, DocumentData } from 'firebase/firestore';
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from 'firebase/app';

type UserAccountData = {
    role: string,
    parentId: string
}
const useGetFullUser = () => {
    const { user } = useAuthContext();
    const [userAccountData, setUserAccountData] = useState<UserAccountData>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchUserAccountData = async () => {
                const db = getFirestore(firebase_app as FirebaseApp);
                const userRef = doc(db, "users", user.uid);

                try {
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserAccountData(data as UserAccountData);
                    } else {
                        setUserAccountData(undefined);
                    }
                } catch (error) {
                    setUserAccountData(undefined);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserAccountData();
        } else {
            setLoading(false);
            setUserAccountData(undefined);
        }
    }, [user]);

    return { userAccountData, isLoading };
};

export default useGetFullUser;
