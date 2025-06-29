// Fonctions d'authentification pour l'application
import {  createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase"; 

// Inscrit un nouvel utilisateur avec email, mot de passe et pseudo
export const registerUser = async (email, password, pseudo) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: pseudo
  });
  return userCredential.user
};
// Connecte un utilisateur avec email et mot de passe
export const loginUser = async (email, password) => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const pseudo = user.displayName;
    // Retourne l'utilisateur et le pseudo si la connexion réussit
    return { success: true, user: user, pseudo: pseudo };

  }catch(error){
    // Retourne l'erreur en cas d'échec de connexion
    return { success: false, error: error.message };
  }
  
};

// Déconnecte l'utilisateur courant
export const logoutUser = () => {
  return signOut(auth);
};
