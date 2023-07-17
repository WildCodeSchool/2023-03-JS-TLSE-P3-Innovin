import React from "react";
import PropTypes from "prop-types";
import "./card.css";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import star from "../../assets/Icons/Star_Default_Icon.svg";
import starhover from "../../assets/Icons/Star_Hover_Icon.svg";
import note from "../../assets/Icons/Tasting_Note_Icon.svg";

function Card({ wine, number, isSelected, onSelect }) {
  const handleStarButtonClick = () => {
    onSelect(number, wine.id);
  };

  return (
    <div className="card_content">
      <div className={`card ${isSelected ? "selected" : ""}`}>
        <div className="title-card">
          <h2 className="h2-card">Vin numéro {number}</h2>
          <button
            className="star-button"
            aria-label="Toggle Star"
            type="button"
            onClick={handleStarButtonClick}
          >
            <img
              className="img-card"
              src={isSelected ? starhover : star}
              alt={isSelected ? "filled star" : "unfilled star"}
            />
          </button>
        </div>
        <div className="card-content">
          <div className="eye-card">
            <img className="img-card" src={eye} alt="eye" />
            <p className="p-card">
              {wine.color} • {wine.limpidity} • {wine.brightness} •{" "}
              {wine.visual_intensity} • {wine.tears}
            </p>
          </div>
          <div className="nose-card">
            <img className="img-card" src={nose} alt="nose" />
            <p className="p-card">
              {wine.intensity_aromas} • {wine.complexity} •{" "}
              {wine.aromas.join(" , ")}
            </p>
          </div>
          <div className="mouth-card">
            <img className="img-card" src={mouth} alt="mouth" />
            <p className="p-card">
              {wine.sweetness} • {wine.alcohol} • {wine.acidity} •{" "}
              {wine.taste_tannin} • {wine.taste_intensity} • {wine.mouth_feel} •{" "}
              {wine.flavor.join(" , ")}
            </p>
            <br />
          </div>
          <div className="comment">
            <img className="img-card note" src={note} alt="comment" />
            <p className="commentary">" {wine.tasting_commentary} "</p>
            <br />
          </div>
          <div className="rating">
            {Array.from(Array(10), (e, i) => (
              <img
                key={i}
                className="rating-star"
                src={i < wine.rating ? starhover : star}
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
    aromas: PropTypes.arrayOf(PropTypes.string).isRequired, // Use array instead of string for aromas and flavor
    flavor: PropTypes.arrayOf(PropTypes.string).isRequired,
    sweetness: PropTypes.string.isRequired,
    alcohol: PropTypes.string.isRequired,
    acidity: PropTypes.string.isRequired,
    taste_tannin: PropTypes.string.isRequired,
    taste_intensity: PropTypes.string.isRequired,
    mouth_feel: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  number: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Card;
