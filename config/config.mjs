import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDwU9Mj5eKJaYn-_NjAlIPxpVKkSNvQRSo",
  authDomain: "back-end-project-53287.firebaseapp.com",
  projectId: "back-end-project-53287",
  storageBucket: "back-end-project-53287.appspot.com",
  messagingSenderId: "128562885403",
  appId: "1:128562885403:web:204f702158d7974af299be",
  measurementId: "G-H1YM6DWJCM",
  storageBucket: 'gs://back-end-project-53287.appspot.com'
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
