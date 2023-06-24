import "./Checkboxes.css";
import PropTypes from "prop-types";

function Checkboxes({ card }) {
  const { name, iconUrl, checks } = card;

  return (
    <div className="checkboxCard">
      <div className="cardTitle">
        <img src={iconUrl} alt="Icon" />
        <h3>{name}</h3>
      </div>
      <div className="checkboxesInputs">
        {checks.map((check) => (
          <label className="checkboxLabel" htmlFor={check}>
            <input
              type="radio"
              id={check}
              name={name}
              key={check}
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
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    checks: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  }).isRequired,
};

export default Checkboxes;
