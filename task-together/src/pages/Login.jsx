import './styles/login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser } from '../services/auth';

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  // Redirige l'utilisateur vers le tableau de bord s'il est déjà connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe(); // Nettoie l'écouteur lors du démontage
  }, [auth, navigate]);

  // Gère la connexion lors du clic sur le bouton
  useEffect(() => {
    const loginBtn = document.querySelector('button');
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        // Tente de connecter l'utilisateur avec les identifiants saisis
        const msg = await loginUser(email, password);
        console.log('login :', msg);
        if (msg.success) {
          // Stocke les informations utilisateur et redirige vers le dashboard
          localStorage.setItem("userEmail", msg.user.email);
          localStorage.setItem("displayName", msg.user.displayName || "User");
          navigate('/dashboard');
        } else {
          // Affiche une alerte en cas d'échec
          alert('Login failed: ' + msg.error);
        }
      } catch (err) {
        // Affiche une alerte en cas d'erreur inattendue
        alert('Login failed: ' + err.message);
      }
    });
  }, []);

  // Affiche le formulaire de connexion
  return (
    <div className="divbody min-h-screen bg-blue-50 flex justify-center items-center">
      <div className="login-container">
        <h2 className="login-title">Connecter</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>se connecter</button>
        <p className="router-to-register">
          Vous n'avez pas de compte ? <a href="/register">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
