import { cookies } from 'next/headers';
import firebase_app from '@/lib/firebase/firebase-client';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { Student, User } from '@/types';
import { auth } from 'firebase-admin';

export async function getStudents() {
    const session = cookies().get("session")?.value || "";
    if (!session) {
        throw ("Session not found")
    }
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const { uid } = decodedClaims;
    const db = firebase_app ? getFirestore(firebase_app) : undefined;
    if (!db) {
        throw ("Database doesn't exist")
    }
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        const user = userSnap.data() as User
        if (user.role === "parent") {
            const studentsRef = collection(db, "School", uid, "Classes", "Class A", "Students");
            const studentsSnap = await getDocs(studentsRef);
            const students = studentsSnap.docs.map((doc) =>
                ({ ...doc.data() } as Student)
            );
            return {
                student: students
            }
        }
        return null
    }
    throw ("User Doesn't Exist")
}