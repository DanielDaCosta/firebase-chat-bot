import { useState, useEffect } from 'react'
import { 
    getFirestore, collection, getDocs
  } from 'firebase/firestore'

import { initializeApp } from 'firebase/app'

type Blog = {
    author: string,
    title: string,
    id: string,
    body: string
}

const useFetch = (firebaseCollection: string) => {

    const firebaseConfig = {
        apiKey: "AIzaSyBFbedwfiJZNtmM1Hah-psboTXdD3jULDY",
        authDomain: "quantum-chat-bot.firebaseapp.com",
        projectId: "quantum-chat-bot",
        storageBucket: "quantum-chat-bot.appspot.com",
        messagingSenderId: "73234206130",
        appId: "1:73234206130:web:b439d7d7a65e2fc9f5a8ab"
    };

    const [data, setData] = useState<Blog[]|null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // Connect to Firestore
        initializeApp(firebaseConfig)
        const db = getFirestore();
        const colRef = collection(db, firebaseCollection);

        getDocs(colRef)
            .then( (snapshot) => {
                if (!snapshot){
                    throw Error('Could not fetch the data');
                }
                let data:Blog[] = []
                snapshot.docs.forEach( (doc) => {
                    const docData = doc.data() as Blog
                    data.push({...docData, id: doc.id})
                })
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
    }, [firebaseCollection]);

    return {data, isPending, error }
}
 
export default useFetch;