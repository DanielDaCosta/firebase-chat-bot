import { useState, useEffect } from 'react'
import { 
    collection, getDocs
  } from 'firebase/firestore'
import db from '../config/firebase-config'

type Blog = {
    author: string,
    title: string,
    id: string,
    body: string
}

const useFetch = (firebaseCollection: string) => {

    const [data, setData] = useState<Blog[]|null>(null);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        // Connect to Firestore
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