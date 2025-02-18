import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXyq75r0fL2RzRbWZzovXIavuw9EjDffs",
  authDomain: "streamline-dd035.firebaseapp.com",
  databaseURL: "https://streamline-dd035-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "streamline-dd035",
  storageBucket: "streamline-dd035.firebasestorage.app",
  messagingSenderId: "844105185182",
  appId: "1:844105185182:web:3b1a75e4de3ffbee5f888f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);