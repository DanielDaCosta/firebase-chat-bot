import { useState, useEffect } from 'react'
import { 
    getFirestore, doc, getDoc
  } from 'firebase/firestore'

import db from '../config/firebase-config'

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

    const [data, setData] = useState<Blog|null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {

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