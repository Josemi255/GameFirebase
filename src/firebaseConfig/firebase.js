import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVRAbD81Gsr-9dShVOVOUNGgZgHtrA1Rw",
  authDomain: "carritopw-9e77f.firebaseapp.com",
  projectId: "carritopw-9e77f",
  storageBucket: "carritopw-9e77f.appspot.com",
  messagingSenderId: "1053070072329",
  appId: "1:1053070072329:web:6a90758395e5a8eec7f6d8",
  measurementId: "G-BFL7DNR98G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)