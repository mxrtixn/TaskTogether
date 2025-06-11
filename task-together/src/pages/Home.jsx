import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Section Hero */}
      <section className="hero-section">
        <h1 className="hero-title">Bienvenue sur TaskTogether</h1>
        <p className="hero-subtitle">
          L'application collaborative pour gérer vos tâches en équipe avec simplicité et efficacité.
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-button">
            Commencer maintenant
          </Link>
        </div>
      </section>

      {/* Section Features */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3 className="feature-title">Gestion de tâches</h3>
          <p>Créez, organisez et suivez vos tâches personnelles ou d'équipe.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3 className="feature-title">Collaboration</h3>
          <p>Partagez vos listes et travaillez ensemble en temps réel.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3 className="feature-title">Performance</h3>
          <p>Une application rapide et réactive grâce à Firebase et React.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;