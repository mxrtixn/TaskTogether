import { useState } from 'react';
import './styles/Register.css'; // Import du fichier CSS
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';

// Composant d'inscription utilisateur
export default function Register() {
  const navigate = useNavigate();
  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setPseudo] = useState('');
  const [error, setError] = useState('');
  
  // Gère la soumission du formulaire d'inscription
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appelle la fonction d'inscription et stocke le nom d'affichage
      const user = await registerUser(email, password, displayName);
      localStorage.setItem("displayName", user.displayName || "User");
      alert('Insription réussie !');
      navigate("/login");
    } catch (err) {
      // Affiche l'erreur en cas d'échec
      setError(err.message);
    }
  };

  // Affiche le formulaire d'inscription
  return (
    <div className='divbody min-h-screen bg-blue-50 flex justify-center items-center'>
      <div className="register-container">
        <h1 className="register-title">S'inscrire</h1>
        
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
            placeholder="Pseudo"
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
            S'inscrire
          </button>
        </form>
        <p className='router-to-login'>Vous avez un compte ? <a href="/login">Se Connecter</a></p>
      </div>
    </div>
  );
}