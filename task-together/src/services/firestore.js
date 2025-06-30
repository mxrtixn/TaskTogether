// src/services/firestore.js
import { db } from './firebase'; // assure-toi que le fichier firebase.js exporte `db`
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc
} from "firebase/firestore";

// Créer une tâche
export const createTask = async (userId, taskData) => {
  const taskRef = collection(db, "tasks");
  return await addDoc(taskRef, {
    ...taskData,
    userId, // Clé correcte ici (minuscules)
    createdAt: new Date(),
  });
};

// Obtenir les tâches d’un utilisateur en temps réel
export const getUserTasks = (userId, callback) => {
  const q = query(collection(db, "tasks"), where("userId", "==", userId)); // corrigé ici aussi
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
};

// Obtenir les tâches partagées avec un utilisateur en temps réel
export const getSharedTask = (userId, callback) => {
  const q = query(collection(db, "tasks"), where("sharedWith", "array-contains", userId)); // corrigé ici aussi
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(tasks);
  });
}

// Mettre à jour une tâche
export const updateTask = async (taskId, updatedData) => {
  const taskRef = doc(db, "tasks", taskId);
  return await updateDoc(taskRef, updatedData);
};

// Supprimer une tâche
export const deleteTask = async (taskId) => {
  const taskRef = doc(db, "tasks", taskId);
  return await deleteDoc(taskRef);
};

// Partager la liste de tâches avec des emails
export const saveShareTasks = async (taskId, Emails) => {
  const taskRef = doc(db, "tasks", taskId);
  const docSnap = await getDoc(taskRef);

  if (docSnap.exists()) {
    await updateDoc(taskRef, {
      sharedWith: Emails,
    });
  } else {
    await setDoc(taskRef, {
      sharedWith: Emails,
    });
  }
};

// Obtenir la liste des emails avec lesquels une tâche est partagée
export const getShareWith = async (taskId) => {
 try {
    const taskRef = doc(db, "tasks", taskId);
    const taskSnap = await getDoc(taskRef);

    if (taskSnap.exists()) {
      const taskData = taskSnap.data();
      const sharedWith = taskData.sharedWith || [];
      return sharedWith;
    } else {
      
      return [];
    }
  } catch (error) {
    
    return [];
  }
};
