import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage,ref,deleteObject  } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBEzaY_qc1oM1z2HXOudQj0PkhBi5-qqjY",
  authDomain: "eshop-c7b47.firebaseapp.com",
  projectId: "eshop-c7b47",
  storageBucket: "eshop-c7b47.appspot.com",
  messagingSenderId: "146951819621",
  appId: "1:146951819621:web:a5099dddf5109c75d4518c",
  measurementId: "G-LZLB41F3DD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const sotreDb = getFirestore(app);
export const storage = getStorage(app);
export const StorageeRef=ref;
export const StorageDeleObj=deleteObject;
export default app;
