import { cookies } from 'next/headers';
import firebase_app from '@/lib/firebase/firebase-client';
import { collection, doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { School, Student, User } from '@/types';
import { auth } from 'firebase-admin';

export async function getSchools() {
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
        if (user.role === "school") {
            const classesRef = collection(db, "School", uid, "Classes");
            const classesSnap = await getDocs(classesRef);
            const classes = await Promise.all(classesSnap.docs.map(async (doc) => {
                const studentsRef = collection(db, "School", uid, "Classes", `${doc.data().name}`, "Students");
                const studentsSnap = await getDocs(studentsRef);
                const students = studentsSnap.docs.map((doc) =>
                    ({ ...doc.data() } as Student)
                );
                // console.log(students, doc.data(), "here");
                return { class: ({ ...doc.data() } as School), students: students };
            }));
            console.log(classes, "aqui")
            return {
                school: classes,
                role: user.role
            }
        }
        return {
            role: user.role
        }
    }
    throw ("User Doesn't Exist")
}


