import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import {
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where
} from 'firebase/firestore';

export function useTasks(userId) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (task) => {
    await addDoc(collection(db, "tasks"), { ...task, userId });
  };

  const updateTask = async (id, updates) => {
    await updateDoc(doc(db, "tasks", id), updates);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  return { tasks, addTask, updateTask, deleteTask };
}
