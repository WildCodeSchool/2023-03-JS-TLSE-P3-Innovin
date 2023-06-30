import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ButtonPrimary from "../../components/ButtonPrimary";
import "./HomeTasting.css";
import line from "../../assets/line-11.svg";
import glass from "../../assets/Icons/glass-wine-icon3.svg";
import star from "../../assets/Icons/star-1.svg";
import mix from "../../assets/Icons/mix-icon.svg";

export default function Welcome() {
  return (
    <div className="page-content">
      <Navbar />
      <div className="fisrt-part">
        <div className="Hero">
          <div className="hero-background">
            <h2 className="h2-hero">Bienvenue sur Inovin</h2>
          </div>
        </div>
        <p className="first-p">
          Laissez vous Guider et partez à la découverte de vos sens
        </p>
        <div className="goldline">
          <img className="line" src={line} alt="ligne or" />
        </div>
        <div className="icons-all">
          <div className="icon">
            <img className="icon-img " src={glass} alt="" />
            <div className="icon-text">
              <p className="icon-title">Sélection</p>
              <p className="text-icon">
                Participez à une dégustation unique de vins monocépages
              </p>
            </div>
          </div>

          <div className="icon">
            <img className="icon-img " src={star} alt="star" />
            <div className="icon-text">
              <p className="icon-title">Dégustation</p>
              <p className="text-icon">
                Choisissez vos vins favoris et apprenez en plus à leur sujet
              </p>
            </div>
          </div>

          <div className="icon">
            <img className="icon-img " src={mix} alt="mix" />
            <div className="icon-text">
              <p className="icon-title">Création</p>
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
      <div className="degustation">
        <div className="hero">
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

      <div className="selection">
        <div className="hero">
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
      <div className="creation">
        <div className="hero">
          <h2 className="h2-title">Création</h2>
        </div>
        <p className="degustation-text">
          Lorem ipsum dolor sit amet consectetur. Purus viverra nunc in massa
          porttitor dignissim dui etiam id. Sagittis suscipit sit elit neque
          dictum a elit. Fermentum semper magna id cum turpis. Ultrices tortor
          enim eget egestas enim proin. Sit pellentesque et eleifend eget. Nisi
          sociis feugiat est ultricies egestas velit
        </p>
      </div>
    </div>
  );
}
