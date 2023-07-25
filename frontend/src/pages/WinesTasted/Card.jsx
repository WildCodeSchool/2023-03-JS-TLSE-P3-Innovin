import React from "react";
import PropTypes from "prop-types";
import "./card.scss";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import star from "../../assets/Icons/Star_Default_Icon.svg";
import starHover from "../../assets/Icons/Star_Hover_Icon.svg";
import note from "../../assets/Icons/Tasting_Note_Icon.svg";

function Card({ wine, number, isSelected, onSelect }) {
  const handleStarButtonClick = () => {
    onSelect(number, wine.id);
  };

  return (
    <div className="cardContent">
      <div className={`card ${isSelected ? "selected" : ""}`}>
        <div className="titleCard">
          <h2 className="h2Card">Vin numéro {number}</h2>
          <button
            className="starButton"
            aria-label="Toggle Star"
            type="button"
            onClick={handleStarButtonClick}
          >
            <img
              className="imgCardSelection"
              src={isSelected ? starHover : star}
              alt={isSelected ? "filled star" : "unfilled star"}
            />
          </button>
        </div>
        <div className="cardContent">
          <div className="eyeCard">
            <img className="imgCardSelection" src={eye} alt="eye" />
            <p className="pCard">
              {wine.color} • {wine.limpidity} • {wine.brightness} •{" "}
              {wine.visual_intensity} • {wine.tears}
            </p>
          </div>
          <div className="noseCard">
            <img className="imgCardSelection" src={nose} alt="nose" />
            <p className="pCard">
              {wine.intensity_aromas} • {wine.complexity} •{" "}
              {wine.aromas.join(" , ")}
            </p>
          </div>
          <div className="mouthCard">
            <img className="imgCardSelection" src={mouth} alt="mouth" />
            <p className="pCard">
              {wine.sweetness} • {wine.alcohol} • {wine.acidity} •{" "}
              {wine.taste_tannin} • {wine.taste_intensity} • {wine.mouth_feel} •{" "}
              {wine.flavor.join(" , ")}
            </p>
            <br />
          </div>
          <div className="comment">
            <img className="imgCardSelection note" src={note} alt="comment" />
            <p className="cardCommentary">" {wine.tasting_commentary} "</p>
            <br />
          </div>
          <div className="rating">
            {Array.from(Array(10), (e, i) => (
              <img
                key={i}
                className="ratingStar"
                src={i < wine.rating ? starHover : star}
                alt={i < wine.rating ? "filled star" : "unfilled star"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  wine: PropTypes.shape({
    tasting_commentary: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    limpidity: PropTypes.string.isRequired,
    brightness: PropTypes.string.isRequired,
    visual_intensity: PropTypes.string.isRequired,
    tears: PropTypes.string.isRequired,
    complexity: PropTypes.string.isRequired,
    intensity_aromas: PropTypes.string.isRequired,
    aromas: PropTypes.arrayOf(PropTypes.string).isRequired,
    flavor: PropTypes.arrayOf(PropTypes.string).isRequired,
    sweetness: PropTypes.string.isRequired,
    alcohol: PropTypes.string.isRequired,
    acidity: PropTypes.string.isRequired,
    taste_tannin: PropTypes.string.isRequired,
    taste_intensity: PropTypes.string.isRequired,
    mouth_feel: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Card;
