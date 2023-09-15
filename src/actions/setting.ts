"use server"

import { customInitApp } from "@/lib/firebase/firebase-admin"
import { auth } from "firebase-admin"
import { User, getAuth } from "firebase/auth"
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore"
import firebase_app from '@/lib/firebase/firebase-client';
import { FirebaseApp } from "firebase/app"

customInitApp()

const db = getFirestore(firebase_app as FirebaseApp)

export async function updateSetting({ userId }: { userId: string }) {

}