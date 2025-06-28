import './styles/login.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser } from '../services/auth';

function Login() {
  const navigate = useNavigate();
  const auth = getAuth();

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth, navigate]);

  useEffect(() => {
    const loginBtn = document.querySelector('button');
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        const msg = await loginUser(email, password);
        console.log('login :', msg);
        if (msg.success) {
          
          localStorage.setItem("userEmail", msg.user.email);
          localStorage.setItem("displayName", msg.user.displayName || "User");
          navigate('/dashboard');
        } else {
          alert('Login failed: ' + msg.error);
        }
      } catch (err) {
        alert('Login failed: ' + err.message);
      }
    });
  }, []);

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
