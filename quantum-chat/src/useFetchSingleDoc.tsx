import { useState, useEffect } from 'react'
import { 
    getFirestore, doc, getDoc
  } from 'firebase/firestore'

import { initializeApp } from 'firebase/app'

type Props = {
    firebaseCollection: string,
    id: string
}

type Blog = {
    author: string,
    title: string,
    body: string
}

type FetchResult = {
    data: Blog | null;
    isPending: boolean;
    error: any;
};

const useFetchSingleDoc = ({ firebaseCollection, id }: Props): FetchResult => {

    const firebaseConfig = {
        apiKey: "AIzaSyBFbedwfiJZNtmM1Hah-psboTXdD3jULDY",
        authDomain: "quantum-chat-bot.firebaseapp.com",
        projectId: "quantum-chat-bot",
        storageBucket: "quantum-chat-bot.appspot.com",
        messagingSenderId: "73234206130",
        appId: "1:73234206130:web:b439d7d7a65e2fc9f5a8ab"
    };

    const [data, setData] = useState<Blog|null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

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
            setData(docSnap.data() as Blog);
            setIsPending(false);
            setError(null);
        }

        try {
            fetchData()
        } catch (err:any) {
            console.log(id)
            setIsPending(false);
            setError(err.message);   
        }
        
    }, [firebaseCollection, id]);

    return {data, isPending, error }
}
 
export default useFetchSingleDoc;