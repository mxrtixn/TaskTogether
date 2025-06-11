import AppRouter from './router';
import { AuthProvider } from './context/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("User is logged in:", user.email);
    } else {
      console.log("No user logged in");
    }
  });
  return <>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </>;
}
export default App;

