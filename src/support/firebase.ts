import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "../config/firebaseConfig";

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized:", app);

export const db = getFirestore(app);
console.log("Firestore Initialized:", db);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
console.log("Firebase Auth Initialized:", auth);
