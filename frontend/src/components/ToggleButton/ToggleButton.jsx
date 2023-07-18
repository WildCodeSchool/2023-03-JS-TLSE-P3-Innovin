import "./ToggleButton.scss";
import PropTypes from "prop-types";

function ToggleButton({ isToggled, onToggle, rounded }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={`slider ${rounded && "rounded"}`} />
    </label>
  );
}

export default ToggleButton;

ToggleButton.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  rounded: PropTypes.bool.isRequired,
};
