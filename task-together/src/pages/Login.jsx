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

        if (msg.success) {
          console.log(msg.user);
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
  }, [navigate]);

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p className="router-to-register">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default Login;
