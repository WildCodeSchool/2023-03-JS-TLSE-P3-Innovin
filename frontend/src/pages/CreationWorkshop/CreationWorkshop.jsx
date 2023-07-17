import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ButtonPrimary from "../../components/ButtonPrimary";
import Sliders from "../../components/Sliders/Sliders";
import "./CreationWorkshop.scss";
import TastingNoteContext from "../../contexts/TastingNoteContext"; // Étape 1 : Import du contexte

function CreationWorkshop() {
  const navigate = useNavigate();
  const { tastingNote } = useContext(TastingNoteContext); // Étape 2 : Utilisation du hook useContext

  // -----------------------------------------handle functions for buttons--------------------------------------------------

  const handleNavigate = () => {
    navigate("/ending");
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="workshop_container">
      <div className="workshop_Content">
        <div className="intro">
          <h3 className="subtitle">Assemblez votre propre vin</h3>
          <p>
            Utilisez maintenant les éléments ci-dessous pour réaliser un
            assemblage en dosant chacun des vins précédemment sélectionnés.
            <br />{" "}
          </p>
        </div>
        <div className="workshop_Sliderbox">
          <Sliders />
        </div>
        <ButtonPrimary onClick={handleNavigate}>Etape finale</ButtonPrimary>
      </div>

      {console.info("tastingNote:", tastingNote)}
    </div>
  );
}
export default CreationWorkshop;
