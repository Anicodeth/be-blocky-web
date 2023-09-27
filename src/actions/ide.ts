"use server";

import { customInitApp } from "@/lib/firebase/firebase-admin";
import firebase_app from "@/lib/firebase/firebase-client";
import { doc, getDoc, getFirestore } from "firebase/firestore";

customInitApp();
const db = firebase_app ? getFirestore(firebase_app) : undefined;

if (!db) {
  throw new Error("DB Not Found");
}

export const getStudentCourseData = async (uid: string) => {
  const courseData = await getDoc(doc(db, "StudentCourses", uid));
  console.log(courseData);
};

export const getProgress = async (uid: string) => {
  const courseData = await getDoc(doc(db, "StudentCourses", uid));
  console.log(courseData.data(), "student prog", uid);
  return courseData.data();
};
