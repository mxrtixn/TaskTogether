// src/services/auth.js
import {  createUserWithEmailAndPassword, updateProfile,setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"; 

export const registerUser = async (email, password, pseudo) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: pseudo
  });
  return userCredential.user
};

export const loginUser = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
    const user = userCredential.user;

    const pseudo = user.displayName;
    // Here's the pseudo
    return { success: true, user: user, pseudo: pseudo };

  }catch(error){
    return { success: false, error: error.message };
  }
  
};

export const logoutUser = () => {
  return signOut(auth);
};
