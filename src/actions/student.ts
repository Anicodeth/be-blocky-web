"use server"

import { customInitApp } from "@/lib/firebase/firebase-admin"
import { auth } from "firebase-admin"
import { User, getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from "firebase/app"

customInitApp()

const db = getFirestore(firebase_app as FirebaseApp)

export async function createChild({ email, password, displayName, parentId, className }: { email: string, password: string, displayName: string, parentId: string, className: string }) {
    const createdUser = await auth().createUser({
        email: email,
        emailVerified: false,
        password,
        displayName
    })
    await createStudent({
        parentId,
        className,
        studentId: createdUser.uid,
        studentEmail: createdUser.email as string,
        studentName: createdUser.displayName as string
    })
}

export async function createStudent({ parentId, className, studentId, studentName, studentEmail }: { parentId: string, className: string, studentId: string, studentEmail: string, studentName: string }) {
    await setDoc(doc(db, "users", studentId), {
        uid: studentId,
        email: studentEmail,
        name: studentName,
        role: "Student",
        credit: 0,
        parentId
    })
    await addDoc(collection(db, "School", parentId, "Classes", className, "Students"), {
        name: studentName,
        email: studentEmail,
        password: "",
        parentId
    });
}

export const getUserByEmail = async (email: string): Promise<{ error: string, data: null } | { data: User }> => {
    const user = await auth().getUserByEmail(email)
    const userRef = doc(db, "users", user.uid);
    const docSnap = (await getDoc(userRef)).data();
    if (docSnap) {
        if (docSnap.role !== "Student") return { error: "The user found associated email isn't student.", data: null }
        if (docSnap.parentId) return { error: "Already assigned to another class!", data: null }
    }
    return { data: user.toJSON() as User }
}