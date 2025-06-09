import React, { useState } from 'react';
//import { registerUser } from '../services/auth';
import './styles/Register.css'; // Import CSS
import { registerUser } from '../services/auth'; 
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setPseudo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, displayName);
      alert('Inscription réussie !');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="register-input"
          required
        />
        <input
          type="text"
          value={displayName}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="Display Name"
          className="register-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="register-input"
          required
          minLength="6"
        />
        <button className="register-button" onClick={handleSubmit}>
          Register
        </button>
      </form>
      <p className='router-to-login'>I have an account? <a href="/login">Log In</a></p>
    </div>
  );
}