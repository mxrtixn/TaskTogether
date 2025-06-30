import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

// Composant de route privée : protège l'accès aux pages nécessitant une authentification
export default function PrivateRoute({ children }) {
  const auth = getAuth();
  const user = auth.currentUser;

  // Si l'utilisateur est authentifié, affiche les enfants, sinon redirige vers /login
  return user ? children : <Navigate to="/login" />;
}