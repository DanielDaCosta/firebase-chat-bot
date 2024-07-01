import { useState, useEffect } from 'react'
import { 
    getFirestore, doc, getDoc
  } from 'firebase/firestore'

import { initializeApp } from 'firebase/app'

const useFetchSingleDoc = (firebaseCollection, id) => {

    const firebaseConfig = {
        apiKey: "AIzaSyBFbedwfiJZNtmM1Hah-psboTXdD3jULDY",
        authDomain: "quantum-chat-bot.firebaseapp.com",
        projectId: "quantum-chat-bot",
        storageBucket: "quantum-chat-bot.appspot.com",
        messagingSenderId: "73234206130",
        appId: "1:73234206130:web:b439d7d7a65e2fc9f5a8ab"
    };

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // Connect to Firestore
        initializeApp(firebaseConfig)
        const db = getFirestore();

        const fetchData = async () => {
            const docRef = doc(db, firebaseCollection, id);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {

                throw Error('Could not fetch the data');
            }
            setData(docSnap.data());
            setIsPending(false);
            setError(null);
        }

        try {
            fetchData()
        } catch (err) {
            setIsPending(false);
            setError(err.message);
            
        }
        
    }, [firebaseCollection, id]);

    return {data, isPending, error }
}
 
export default useFetchSingleDoc;