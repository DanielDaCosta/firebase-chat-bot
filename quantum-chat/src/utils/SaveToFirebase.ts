import { 
    collection,
    addDoc
  } from 'firebase/firestore'
import { DataFirestore } from '../types/context';
import db from '../config/firebase-config';

type IData = DataFirestore & {
  firebaseCollection: string
}

const SaveToFirebase = ({firebaseCollection, prompt, answer}: IData): Promise<void> => {
  
  const colRef = collection(db, firebaseCollection)

  return addDoc(colRef, {
    prompt: prompt,
    answer: answer
  }).then(() => {
    console.log('Item Saved')
  }).catch((err) => {
    console.log('Error saving document: ', err);
    throw err;
  }) 
}

export default SaveToFirebase;