import './styles/login.css'
import { useEffect } from 'react';
import { loginUser } from '../services/auth'; // you’ll create this
import { useNavigate } from 'react-router-dom';
function Login() {
  useEffect(() => {
    const loginBtn = document.querySelector('button');
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = document.querySelector('input[type="email"]').value;
      const password = document.querySelector('input[type="password"]').value;

      try {
        const msg = await loginUser(email, password);
        
        if (msg.success){
          window.location.href = '/dashboard'; // redirect after login
        }else{
          alert('Login failed: ' + 'Invalid credentials');
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