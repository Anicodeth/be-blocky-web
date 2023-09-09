"use server"

import { customInitApp } from "@/lib/firebase/firebase-admin"
import { auth } from "firebase-admin"
import { getAuth } from "firebase/auth"
import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore"
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
    await setDoc(doc(db, "users", createdUser.uid), {
        uid: createdUser.uid,
        email: createdUser.email,
        name: displayName,
        role: "Student",
        credit: 0,
        parentId
    })
    await addDoc(collection(db, "School", parentId, "Classes", className, "Students"), {
        name: displayName,
        email,
        password,
        parentId
    });
}
