import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./HomeTasting.css";
import line from "../../assets/line-11.svg";
import glass from "../../assets/Icons/glass-wine-icon3.svg";
import star from "../../assets/Icons/star-1.svg";
import mix from "../../assets/Icons/mix-icon.svg";
import Footer from "../../components/Footer/Footer";

export default function Welcome() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-content-nose">
      <Navbar />
      <div className="fisrt-part">
        <div className="Hero">
          <div className="hero-background">
            <h2 className="h2-hero"> Bienvenue chez Inovin</h2>
          </div>
        </div>
        <p className="first-p">
          Laissez vous guider et partez à la découverte de vos sens.
        </p>
        <div className="goldline">
          <img className="line" src={line} alt="ligne or" />
        </div>
        <div className="icons-all">
          <div className="icon">
            <img className="icon-img " src={glass} alt="" />
            <div className="icon-text">
              <a className="icon-title" href="#degustation">
                Dégustation
              </a>
              <p className="text-icon">
                Participez à une dégustation unique de vins monocépages
              </p>
            </div>
          </div>

          <div className="icon">
            <img className="icon-img " src={star} alt="star" />
            <div className="icon-text">
              <a className="icon-title" href="#selection">
                Sélection
              </a>
              <p className="text-icon">
                Choisissez vos vins favoris et apprenez en plus à leur sujet
              </p>
            </div>
          </div>

          <div className="icon">
            <img className="icon-img " src={mix} alt="mix" />
            <div className="icon-text">
              <a className="icon-title" href="#creation">
                Création
              </a>
              <p className="text-icon">
                Assemblez les vins de votre sélection vous-même. <br /> Réalisez
                les dosages selon vos goûts
              </p>
            </div>
          </div>
        </div>
        <div className="button">
          <ButtonPrimary>Inscription</ButtonPrimary>
          <img className="line" src={line} alt="ligne or" />
        </div>
      </div>
      <div className="degust-desktop">
        <div className="degustation" id="degustation">
          <div className="desktop-degust">
            <div className="hero1">
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
        <div className="degust-img">
          <div className="degust-imgage" />
        </div>
      </div>
      <div className="selection-desktop">
        <div className="selection" id="selection">
          <div className="hero2">
            <h2 className="h2-title">Séléction</h2>
          </div>
          <p className="degustation-text">
            Une fois la dégustation terminée, laissez votre palais guider votre
            choix en sélectionnant les vins qui ont captivé votre attention.
            Notre équipe d'experts sera là pour vous conseiller et répondre à
            toutes vos questions. Faites confiance à votre instinct et
            choisissez les vins qui vous ont le plus impressionné, ceux qui
            reflètent parfaitement vos préférences et vos découvertes lors de
            cette expérience gustative.
          </p>
        </div>

        <div className="selection-img">
          <div className="selection-image" />
        </div>
      </div>

      <div className="creation" id="creation">
        <div className="hero3">
          <h2 className="h2-title-creation">Création</h2>
        </div>
        <p className="degustation-text">
          Laissez libre cours à votre créativité en participant à une aventure
          œnologique unique. Les vins que vous avez sélectionnés seront
          habilement mélangés pour créer un vin unique et personnalisé, qui
          incarnera vos choix et votre goût. Notre expert mettra tout son
          savoir-faire pour vous guider dans cette création sur mesure. Soyez
          témoin de la naissance d'une œuvre d'art vinicole, un vin qui raconte
          votre histoire. <br />
          <br />
        </p>
      </div>
      <div className="up">
        <button type="button" className="scroll-to-top" onClick={scrollToTop}>
          {" "}
        </button>
      </div>
      <Footer />
    </div>
  );
}
