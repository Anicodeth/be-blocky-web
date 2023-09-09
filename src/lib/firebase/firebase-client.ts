import { getApps, initializeApp } from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase-config";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export default app;