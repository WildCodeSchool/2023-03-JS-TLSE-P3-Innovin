import "./Checkboxes.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import TastingNoteContext from "../../contexts/TastingNoteContext";

function Checkboxes({ name, checks, iconUrl, ids, id }) {
  const tastingNoteValue = useContext(TastingNoteContext);
  const { setTastingNote, tastingNote } = tastingNoteValue;

  const handleFillObject = (index) => {
    setTastingNote({
      ...tastingNote,
      [id]: ids[index],
    });
  };

  return (
    <div className="checkboxCard">
      <div className="cardTitle">
        <img src={iconUrl} alt="Icon" />
        <h3>{name}</h3>
      </div>
      <div className="checkboxesInputs">
        {checks.map((check, index) => (
          <label key={check} className="checkboxLabel" htmlFor={check}>
            <input
              onChange={() => {
                handleFillObject(index);
              }}
              type="radio"
              id={check}
              name={name}
              value={check}
            />
            {check}
          </label>
        ))}
      </div>
    </div>
  );
}

Checkboxes.propTypes = {
  name: PropTypes.string.isRequired,
  checks: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconUrl: PropTypes.string.isRequired,
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  id: PropTypes.string.isRequired,
};

export default Checkboxes;
