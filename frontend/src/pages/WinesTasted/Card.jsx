import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TastingNoteContext from "../../contexts/TastingNoteContext";
import "./card.css";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import star from "../../assets/Icons/Star_Default_Icon.svg";
import starhover from "../../assets/Icons/Star_Hover_Icon.svg";

function Card({ wine, isSelected, number, onSelect }) {
  const { tastingNote, setTastingNote } = useContext(TastingNoteContext);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  const handleStarClick = () => {
    setSelected(!selected);
    onSelect(number);
    setTastingNote((prevTastingNote) => ({
      ...prevTastingNote,
      selectedWines: selected
        ? prevTastingNote.selectedWines.filter((num) => num !== number)
        : [...prevTastingNote.selectedWines, number],
    }));
  };

  return (
    <div className="card">
      <div className="title-card">
        <h2 className="h2-card">Vin numéro {wine.id_existing_wine}</h2>
        <button
          className="star-button"
          onClick={handleStarClick}
          aria-label="Toggle Star"
          type="button"
        >
          <img
            className="img-card"
            src={selected ? starhover : star}
            alt="star"
          />
        </button>
      </div>
      <div className="card-content">
        <div className="eye-card">
          <img className="img-card" src={eye} alt="eye" />
          <p className="p-card">
            {tastingNote.idVisualColor} Rosé • {tastingNote.idVisualLimpidity}
            Transparente • {tastingNote.idVisualBrightness} Nette •
            {tastingNote.idVisualIntensity} Claire • {tastingNote.idVisualTears}
            Grasses
          </p>
        </div>
        <div className="nose-card">
          <img className="img-card" src={nose} alt="nose" />
          <p className="p-card">
            {tastingNote.idOlfactiveIntensity} Discret •
            {tastingNote.idOlfactiveComplexity} Simple •
            {tastingNote.idOlfactiveAromas} Boisé, Fruits
          </p>
        </div>
        <div className="mouth-card">
          <img className="img-card" src={mouth} alt="mouth" />
          <p className="p-card">
            {tastingNote.idTasteSweetness} Liquoreux •
            {tastingNote.idTasteAlcohol} Alcooleux • {tastingNote.idAcidity}
            Nerveuse • {tastingNote.idTasteTannin} Apre •
            {tastingNote.idTasteIntensity} Discret •
            {tastingNote.idTasteMouthFeel}
            Longue
          </p>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  wine: PropTypes.shape({
    id_existing_wine: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Card;
