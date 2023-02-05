import { db } from "./config";
import { serverTimestamp, addDoc, collection } from "firebase/firestore"
export const addDocument = ( tableName, data) => {
    
     addDoc(collection(db, tableName), {
         ...data,
         createdAt: serverTimestamp(),
     });


}