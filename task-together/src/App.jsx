import AppRouter from './router';
import { AuthProvider } from './context/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css'
import { Navigate } from 'react-router-dom';

// Composant principal de l'application
function App() {
  const auth = getAuth();

  // Surveille l'état d'authentification de l'utilisateur
  onAuthStateChanged(auth, (user) => {
    if (user){
      // Si l'utilisateur est connecté, stocke ses informations dans le localStorage
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("displayName", user.displayName || "User");
    } else {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      Navigate("/login")
    }
  });

  // Rendu de l'application avec le fournisseur d'authentification et le routeur
  return <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </>;
}

export default App;

