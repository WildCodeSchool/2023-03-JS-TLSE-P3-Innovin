import { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ id, options, tastingNote, setTastingNote }) {
  const [isActive, setIsActive] = useState(true);
  const [selectedOption, setSelectedOption] = useState(
    "sélectionner une option"
  );

  const handleFillObject = (e, option) => {
    e.preventDefault();
    setTastingNote({
      ...tastingNote,
      [id]: option,
    });
  };

  return (
    <div className="dropdown">
      <button
        className="dropdownBtn"
        type="button"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedOption}
        <i className="fi fi-br-angle-down" />
      </button>
      {isActive &&
        options.map((option) => (
          <div className="dropdownContent">
            <input
              className="radioBtn"
              type="radio"
              id={id}
              name={id}
              key={option}
              value={option}
              onClick={(e) => {
                setSelectedOption(option);
                setIsActive(false);
                handleFillObject(e, option);
              }}
            />
            <label htmlFor={id}>{option}</label>
          </div>
        ))}
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  tastingNote: PropTypes.shape({
    wineQuality: PropTypes.string.isRequired,
    idOlfactiveIntensity: PropTypes.string.isRequired,
    idUser: PropTypes.string.isRequired,
    selectedWine: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    tastingCommentary: PropTypes.string.isRequired,
    idOlfactiveComplexity: PropTypes.string.isRequired,
    idVisualColor: PropTypes.string.isRequired,
    idVisualLimpidity: PropTypes.string.isRequired,
    idVisualBrightness: PropTypes.string.isRequired,
    idVisualTears: PropTypes.string.isRequired,
    idTasteIntensity: PropTypes.string.isRequired,
    idTasteMouthFeel: PropTypes.string.isRequired,
    idTasteAlcohol: PropTypes.string.isRequired,
    idAcidity: PropTypes.string.isRequired,
    idTasteSweetness: PropTypes.string.isRequired,
    idTasteTannin: PropTypes.string.isRequired,
    idVisualIntensity: PropTypes.string.isRequired,
  }).isRequired,
  setTastingNote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
