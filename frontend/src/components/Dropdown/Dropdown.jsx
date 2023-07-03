import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "./Dropdown.scss";
import TastingNoteContext from "../../contexts/TastingNoteContext";

function Dropdown({ id, options }) {
  const tastingNoteValue = useContext(TastingNoteContext);
  const { setTastingNote, tastingNote } = tastingNoteValue;
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    "sélectionner une option"
  );
  const [selected, setSelected] = useState(false);

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
        className={`dropdownBtn ${selected ? "selected" : "grey"} `}
        type="button"
        onClick={() => setIsActive(!isActive)}
      >
        {selectedOption}
        <i className="fi fi-br-angle-down" />
      </button>
      <div className="dropdownContent">
        {isActive &&
          options.map((option) => (
            <button
              className="dropdownInputs"
              type="button"
              id={id}
              name="wineQuality"
              key={option}
              value={option}
              onClick={(e) => {
                setSelectedOption(option);
                setIsActive(false);
                handleFillObject(e, option);
                setSelected(true);
              }}
            >
              {option}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
