import React from "react";
import "./styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenue sur TaskTogether</h1>
      <p className="home-description">
        Organisez vos tâches, collaborez en temps réel, et atteignez vos objectifs !
      </p>
      <button className="home-button">Commencer</button>
    </div>
  );
}

export default Home;
