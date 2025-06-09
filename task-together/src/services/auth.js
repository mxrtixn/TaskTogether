// src/services/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const registerUser = async (email, password, pseudo) => {
  const userCredential =  createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, {
    displayName: pseudo
  });
  return userCredential.user
};

export const loginUser = (email, password) => {
  const userCredential = signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const pseudo = user.displayName; // Here's the pseudo

  return { user, pseudo };
};

export const logoutUser = () => {
  return signOut(auth);
};
