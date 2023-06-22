import React from "react";
import "./TastingPresentation.css";

export default function TastingPresentation() {
  return (
    <div className="start-degust">
      <div className="page-content">
        <div className="box">
          <h1 className="title">Dégustation</h1>
          <p className="text">
            Vous vous apprêtez à déguster 5 vins monocépages avec une fiche à
            remplir pour chacun des vins.
            <br />
            <br />
            Vous allez être guidé tout au long du processus de dégustation.
            <br />
            Les vins dégustés ne vous seront dévoilés qu’à la fin de la
            dégustation de sorte à ce que vous ne puissiez vous fier uniquement
            à ce que vous ressentez!
            <br />
            <br />
            Soyez attentifs et laissez vous porter par vos sens.
          </p>
          <div className="button-container">
            <button type="button" className="button">
              Démarrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
