import './styles/login.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { loginUser } from '../services/auth'; // you’ll create this
function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          navigate('/dashboard');
        }
      });

      return () => unsubscribe(); // Cleanup the listener
    }, [auth, navigate]);
  
  useEffect(() => {
    // Redirect to dashboard if already logged in
    
    const loginBtn = document.querySelector('button');
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        const msg = await loginUser(email, password);
        
        if (msg.success){
          console.log(msg.pseudo);
          localStorage.setItem("userEmail", msg.user.email);  // store email
          localStorage.setItem("displayName", msg.user.displayName || "User");  // optional
          window.location.href = '/dashboard'; // redirect after login
          
        }else{
          alert('Login failed: ' + msg.error);
        }
      } catch (err) {
        alert('Login failed 2: ' + err.message);
      }
    });
  }, []);
    return(<div className="login-container">
      <h2 className='login-title'>Login</h2>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p className='router-to-register'>Don't have an account? <a href="/register">Register</a></p>
    </div>
    );
}
export default Login;