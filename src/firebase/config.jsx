// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-838e7.firebaseapp.com",
  projectId: "chat-app-838e7",
  storageBucket: "chat-app-838e7.appspot.com",
  messagingSenderId: "696449174693",
  appId: "1:696449174693:web:65e841764dd36dca09514c",
  measurementId: "G-2JLMEHMSCG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth}

