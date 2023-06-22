import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navBar">
      <div>
        <h1>INNOVIN</h1>
      </div>

      <div className="navbarpoppins">
        <div className="navbar-link">Accueil</div>
        <div className="navbar-link">Carte</div>
        <div className="navbar-link">Glossaire</div>
        <div className="navbar-link">A Propos</div>
        <div className="navbar-link">Contact</div>
        <div className="navbar-link">Inscription</div>
      </div>
    </div>
  );
}
