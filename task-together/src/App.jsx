import AppRouter from './router';
import { AuthProvider } from './context/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css'
import { Navigate } from 'react-router-dom';
function App() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user){
localStorage.setItem("userEmail", user.email);
    localStorage.setItem("displayName", user.displayName || "User");
    }else{
      Navigate("/login")
    }
    
    
  });
  return <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </>;
}
export default App;

