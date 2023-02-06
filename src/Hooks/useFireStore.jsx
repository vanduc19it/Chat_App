import { useEffect, useState } from 'react'

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const  useFireStore = (collect, condition) => {

    const [documents, setDocuments] = useState([]);

  useEffect(()=>{

    const collectionRef = collection(db, collect);

    if(condition) {

        if(!condition.compareValue || !condition.compareValue.length) {
            return;
        }
            console.log(condition.operator, condition.compareValue, condition.fieldName)

            let q =  query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));

            const unsubscribe = onSnapshot(q, (snapshot) => {
                console.log(snapshot.docs)
                const documents = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id:doc.id,
                }))
                
                setDocuments(documents);
              
            })
            return unsubscribe;
    }

  },[collect, condition])

  return documents;
}

export default useFireStore;