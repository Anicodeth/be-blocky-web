"use server";

import { customInitApp } from "@/lib/firebase/firebase-admin";
import firebase_app from "@/lib/firebase/firebase-client";
import { doc, getDoc, getFirestore } from "firebase/firestore";

customInitApp();
const db = firebase_app ? getFirestore(firebase_app) : undefined;

export const getStudentCourseData = async (uid: string) => {
  if (!db) {
    throw new Error("DB Not Found");
  }
  const courseData = await getDoc(doc(db, "StudentCourseLessons", uid));
  console.log(courseData);
};
