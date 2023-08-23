import db from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; 

const logging = async (newLog) => {
    const taskRef = doc(collection(db, "log"));
    setDoc(taskRef,{
      ...newLog,
      id: taskRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

export { logging };