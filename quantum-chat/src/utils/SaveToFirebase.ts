import { 
    collection,
    addDoc,
    DocumentReference,
    DocumentData
  } from 'firebase/firestore'
import { DataFirestore } from '../types/context';
import db from '../config/firebase-config';

type IData = DataFirestore & {
  firebaseCollection: string
}

const SaveToFirebase = ({firebaseCollection, prompt, answer}: IData): Promise<string> => {
  
  const colRef = collection(db, firebaseCollection)

  return addDoc(colRef, {
    prompt: prompt,
    answer: answer
  }).then((docRef: DocumentReference<DocumentData>) => {
    return docRef.id
  })
}

export default SaveToFirebase;