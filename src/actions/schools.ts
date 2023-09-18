"use server"

import { cookies } from 'next/headers';
import firebase_app from '@/lib/firebase/firebase-client';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { Classroom, School, Student, User } from '@/types';
import { auth } from 'firebase-admin';
import { customInitApp } from '@/lib/firebase/firebase-admin';


customInitApp()
const db = firebase_app ? getFirestore(firebase_app) : undefined;

export async function getSchools() {
    const session = cookies().get("session")?.value || "";
    if (!session) {
        throw ("Session not found")
    }
    const decodedClaims = await auth().verifySessionCookie(session, true);
    const { uid } = decodedClaims;
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
            const q = query(collection(db, "Classes"), where("userId", "==", uid));
            const querySnapshot = await getDocs(q);
            const data = await Promise.all(querySnapshot.docs.map(async (doc) => {
                const studentsQuery = query(collection(db, "users"), where("classId", "==", doc.data().name))
                const studentsSnap = await getDocs(studentsQuery)
                const students = studentsSnap.docs.map((doc) =>
                    ({ ...doc.data() } as Student)
                );
                return {
                    classRoom: doc.data() as Classroom,
                    students
                }
            }))
            return data
        }
        return null
    }
    throw ("User Doesn't Exist")
}


export const addClass = async (userId: string, name: string) => {
    if (!db) {
        throw Error("Db Isn't here")
    }
    const res = await addDoc(collection(db, "Classes"), {
        name,
        userId
    })
    console.log(res.id)
}

export const getClasses = async (userId: string) => {
    if (!db) {
        throw Error("Db Isn't here")
    }
    const docRef = doc(db, "Classes", userId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        console.log("No such document!");
    }
}