import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navBar">
      <div className="logo-h1">
        <h1 className="titre-logo">INOVIN</h1>
      </div>

      <ul className={`navbarpoppins ${isMenuOpen ? "open" : ""}`}>
        <div className="link">
          <li className="navbar-link">
            <Link to="/">Accueil</Link>
          </li>
          <li className="navbar-link">
            <Link to="/carte">Carte</Link>
          </li>
          <li className="navbar-link">
            <Link to="/glossaire">Glossaire</Link>
          </li>
          <li className="navbar-link">
            <Link to="/a-propos">A Propos</Link>
          </li>
          <li className="navbar-link">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="navbar-link">
            <Link to="/registration">Inscription</Link>
          </li>
        </div>
      </ul>

      <button type="button" className="burger-menu" onClick={toggleMenu}>
        <span className={`bar ${isMenuOpen ? "open" : ""}`} />
        <span className={`bar ${isMenuOpen ? "open" : ""}`} />
        <span className={`bar ${isMenuOpen ? "open" : ""}`} />
      </button>
    </nav>
  );
}
