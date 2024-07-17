import "firebase/auth";
import "firebase/firestore";
import type { FirebaseOptions } from "firebase/app";

const PROJECT_ID = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? "";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// // config(); // Load environment variables from .env file

// // export const firebaseConfig = {
// //   apiKey: process.env.API_KEY,
// //   authDomain: process.env.AUTH_DOMAIN,
// //   projectId: process.env.PROJECT_ID,
// //   storageBucket: process.env.STORAGE_BUCKET,
// //   messagingSenderId: process.env.MESSAGING_SENDER_ID,
// //   appId: process.env.APP_ID,
// // };

// import "firebase/auth";
// import "firebase/firestore";
// import Constants from "expo-constants";

// export const firebaseConfig = {
//   apiKey: Constants.manifest.extra.apiKey,
//   authDomain: Constants.manifest.extra.authDomain,
//   projectId: Constants.manifest.extra.projectId,
//   storageBucket: Constants.manifest.extra.storageBucket,
//   messagingSenderId: Constants.manifest.extra.messagingSenderId,
//   appId: Constants.manifest.extra.appId,
// };
