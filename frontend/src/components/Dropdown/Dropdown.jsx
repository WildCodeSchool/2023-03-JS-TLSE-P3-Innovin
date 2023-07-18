import { useState } from "react";
import PropTypes from "prop-types";
import "./Dropdown.scss";

function Dropdown({ id, options, name, object, setObject, inputValue }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(inputValue);
  const [selected, setSelected] = useState(false);

  const handleFillObject = (e, option) => {
    e.preventDefault();
    setObject({
      ...object,
      [id]: option,
    });
  };

  return (
    <div className="dropdown">
      <input
        className={`dropdownBtn ${selected ? "selected" : "grey"} `}
        onClick={() => setIsActive(!isActive)}
        onChange={(e) => setSelectedOption(e.target.value)}
        value={selectedOption}
        readOnly
      />

      <i className="fi fi-br-angle-down" />

      <div className="dropdownContent">
        {isActive &&
          options.map((option) => (
            <button
              className="dropdownInputs"
              type="button"
              id={id}
              name={name}
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
  name: PropTypes.string.isRequired,
  setObject: PropTypes.func.isRequired,
  object: PropTypes.shape({}).isRequired,
  inputValue: PropTypes.string.isRequired,
};
