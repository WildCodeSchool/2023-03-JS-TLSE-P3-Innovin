import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./HomeTasting.css";
import line from "../../assets/line-11.svg";
import glass from "../../assets/Icons/glass-wine-icon3.svg";
import star from "../../assets/Icons/star-1.svg";
import mix from "../../assets/Icons/mix-icon.svg";

export default function Welcome() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="page-content">
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
      <div className="degustation" id="degustation">
        <div className="hero1">
          <h2 className="h2-title">Dégustation</h2>
        </div>
        <p className="degustation-text">
          Lorem ipsum dolor sit amet consectetur. Purus viverra nunc in massa
          porttitor dignissim dui etiam id. Sagittis suscipit sit elit neque
          dictum a elit. Fermentum semper magna id cum turpis. Ultrices tortor
          enim eget egestas enim proin. Sit pellentesque et eleifend eget. Nisi
          sociis feugiat est ultricies egestas velit
        </p>
        <div className="button">
          <ButtonPrimary>En savoir plus </ButtonPrimary>
        </div>
      </div>

      <div className="selection" id="selection">
        <div className="hero2">
          <h2 className="h2-title">Séléction</h2>
        </div>
        <p className="degustation-text">
          Lorem ipsum dolor sit amet consectetur. Purus viverra nunc in massa
          porttitor dignissim dui etiam id. Sagittis suscipit sit elit neque
          dictum a elit. Fermentum semper magna id cum turpis. Ultrices tortor
          enim eget egestas enim proin. Sit pellentesque et eleifend eget. Nisi
          sociis feugiat est ultricies egestas velit
        </p>
      </div>
      <div className="creation" id="creation">
        <div className="hero3">
          <h2 className="h2-title">Création</h2>
        </div>
        <p className="degustation-text">
          Lorem ipsum dolor sit amet consecteturbr. Purus viverra nunc in massa
          porttitor dignissim dui etiam id. Sagittis suscipit sit elit neque
          dictum a elit. Fermentum semper magna id cum turpis. Ultrices tortor
          enim eget egestas enim proin. <br />
          <br />
        </p>
      </div>
      <button type="button" className="scroll-to-top" onClick={scrollToTop}>
        UP
      </button>
    </div>
  );
}
