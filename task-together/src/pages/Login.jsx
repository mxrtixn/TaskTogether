import './styles/login.css'
function Login() {
    return(<div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
    );
}
export default Login;