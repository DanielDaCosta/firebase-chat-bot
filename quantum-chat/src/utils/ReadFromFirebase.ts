import { 
    DocumentData,
    DocumentSnapshot,
    doc,
    getDoc
  } from 'firebase/firestore'
import { DataFirestore } from '../types/context';
import db from '../config/firebase-config';

interface ISearchData {
  firebaseCollection: string,
  id: string
}

const ReadFromFirebase = ({firebaseCollection, id}: ISearchData): Promise<DataFirestore> => {
  
    const docRef = doc(db, firebaseCollection, id);
    return getDoc(docRef).then((docSnap: DocumentSnapshot<DocumentData, DocumentData>) => {
        return docSnap.data() as DataFirestore
    });
}

export default ReadFromFirebase;