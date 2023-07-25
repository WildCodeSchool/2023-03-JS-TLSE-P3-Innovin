import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./HomeTasting.scss";
import glass from "../../assets/Icons/glass-wine-icon3.svg";
import star from "../../assets/Icons/star-1.svg";
import mix from "../../assets/Icons/mix-icon.svg";
import creation from "../../assets/Wine_Img/Creation_Header.png";
import upArrow from "../../assets/Icons/Up_Arrow_Icon.svg";
import hero1 from "../../assets/Wine_Img/unsplash_PQQPlv6oHAA.jpg";
import hero2 from "../../assets/Wine_Img/unsplash_3uJt73tr4hI.jpg";
import fullCreation from "../../assets/Illustration_Creation.svg";

export default function Welcome() {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="page-content-home">
        <div className="first-part">
          <div className="hero">
            <h2 className="h2-hero"> Bienvenue chez Inovin</h2>
            <div className="hero-background " />
          </div>
          <p className="first-p">
            Laissez vous guider et partez à la découverte de vos sens.
          </p>
          <hr className="line" />
          <div className="icons-all">
            <div className="icon">
              <div className="icon-img">
                <img src={glass} alt="icon of glass" />
              </div>
              <div className="icon-text">
                <a className="icon-title" href="#degustation">
                  Dégustation
                </a>
                <p className="icon-text-p">
                  Participez à une dégustation unique de vins monocépages
                </p>
              </div>
            </div>

            <div className="icon">
              <div className="icon-img">
                <img src={star} alt="star" />
              </div>

              <div className="icon-text">
                <a className="icon-title" href="#selection">
                  Sélection
                </a>
                <p className="icon-text-p">
                  Choisissez vos vins favoris et apprenez en plus à leur sujet
                </p>
              </div>
            </div>

            <div className="icon">
              <div className="icon-img">
                <img src={mix} alt="mix" />
              </div>

              <div className="icon-text">
                <a className="icon-title" href="#creation">
                  Création
                </a>
                <p className="icon-text-p">
                  Assemblez les vins de votre sélection vous-même. <br />{" "}
                  Réalisez les dosages selon vos goûts
                </p>
              </div>
            </div>
          </div>
          <hr className="line2" />
        </div>
        <ButtonPrimary
          className="register"
          type="button"
          onClick={() => navigate("/login")}
        >
          Connexion
        </ButtonPrimary>
        <div className="degust-desktop">
          <div className="degustation" id="degustation">
            <div className="hero1">
              <img src={hero1} alt="" />
              <h2 className="h2-title">Dégustation</h2>
            </div>
            <p className="degustation-text">
              Plongez dans un voyage sensoriel unique en réservant une session
              de dégustation avec notre caviste passionné. Découvrez des vins
              monocépages soigneusement sélectionnés et laissez vos papilles
              explorer les subtilités et les caractéristiques distinctes de
              chaque cépage. Éveillez vos sens et appréciez les nuances uniques
              de chaque vin lors de cette expérience.
            </p>
          </div>
        </div>
        <div className="selection-desktop">
          <div className="selection" id="selection">
            <div className="hero2">
              <img src={hero2} alt="" />
              <h2 className="h2-title">Sélection</h2>
            </div>
            <p className="degustation-text">
              Une fois la dégustation terminée, laissez votre palais guider
              votre choix en sélectionnant les vins qui ont captivé votre
              attention. Notre équipe d'experts sera là pour vous conseiller et
              répondre à toutes vos questions. Faites confiance à votre instinct
              et choisissez les vins qui vous ont le plus impressionné, ceux qui
              reflètent parfaitement vos préférences et vos découvertes lors de
              cette expérience gustative.
            </p>
          </div>
        </div>
        <div className="creation" id="creation">
          <div className="hero3">
            <img className="mobile-creation" src={creation} alt="" />
            <img className="desktop-creation" src={fullCreation} alt="" />
            <h2 className="h2-title-creation">Création</h2>
          </div>
          <p className="degustation-text">
            Laissez libre cours à votre créativité en participant à une aventure
            œnologique unique. Les vins que vous avez sélectionnés seront
            habilement mélangés pour créer un vin unique et personnalisé, qui
            incarnera vos choix et votre goût. Notre expert mettra tout son
            savoir-faire pour vous guider dans cette création sur mesure. Soyez
            témoin de la naissance d'une œuvre d'art vinicole, un vin qui
            raconte votre histoire. <br />
          </p>
        </div>
        <div className="up">
          <button type="button" className="scroll-to-top" onClick={scrollToTop}>
            <img src={upArrow} alt="gold arrow icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
