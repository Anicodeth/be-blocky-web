import { getAuth } from "firebase/auth";
import app from "./firebase-client";

export const auth = getAuth(app)