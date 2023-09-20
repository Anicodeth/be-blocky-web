"use server";

import { customInitApp } from "@/lib/firebase/firebase-admin";
import firebase_app from "@/lib/firebase/firebase-client";
import { auth } from "firebase-admin";
import { FirebaseApp } from "firebase/app";
import { User } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

customInitApp();

const db = getFirestore(firebase_app as FirebaseApp);

export async function createChild({
  email,
  password,
  displayName,
  parentId,
  classroom,
}: {
  email: string;
  password: string;
  displayName: string;
  parentId: string;
  classroom: string;
}) {
  const createdUser = await auth().createUser({
    email: email,
    emailVerified: false,
    password,
    displayName,
  });
  await createStudent({
    parentId,
    classroom,
    studentId: createdUser.uid,
    studentEmail: createdUser.email as string,
    studentName: createdUser.displayName as string,
  });
}

export async function createStudent({
  parentId,
  classroom,
  studentId,
  studentName,
  studentEmail,
}: {
  parentId: string;
  classroom: string;
  studentId: string;
  studentEmail: string;
  studentName: string;
}) {
  await setDoc(doc(db, "users", studentId), {
    uid: studentId,
    email: studentEmail,
    name: studentName,
    role: "Student",
    credit: 0,
    parentId,
    classId: classroom,
  });
  await setDoc(doc(db, "students", studentId), {
    name: studentName,
    email: studentEmail,
    classroom: classroom,
    courses: [""],
    parentId,
    userId: studentId,
  });
}

export const getUserByEmail = async (
  email: string
): Promise<{ error: string; data: null } | { data: User }> => {
  const user = await auth().getUserByEmail(email);
  const userRef = doc(db, "users", user.uid);
  const docSnap = (await getDoc(userRef)).data();
  if (docSnap) {
    if (docSnap.role !== "Student")
      return {
        error: "The user found associated email isn't student.",
        data: null,
      };
    if (docSnap.parentId)
      return { error: "Already assigned to another class!", data: null };
  }
  return { data: user.toJSON() as User };
};

export const addCourse = async (studentId: string, courses: string[]) => {
  await updateDoc(doc(db, "students", studentId), {
    courses,
  });
};
