import PropTypes from "prop-types";
import ButtonPrimary from "../ButtonPrimary";
import "./ModalValidation.scss";

function ModalValidation({
  isOpen,
  setIsOpen,
  question,
  firstButton,
  secondButton,
  actionFunction,
  functionParam,
}) {
  return (
    <div className={`actionModal ${isOpen && "show"}`}>
      <p>{question}</p>
      <div className="buttons">
        <ButtonPrimary
          type="button"
          className="yesBtn"
          onClick={() => {
            if (functionParam) {
              actionFunction(functionParam);
            } else {
              actionFunction();
            }
            setIsOpen(false);
          }}
        >
          {firstButton}
        </ButtonPrimary>
        <ButtonPrimary
          type="button"
          className="noBtn"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {secondButton}
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default ModalValidation;

ModalValidation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  question: PropTypes.string.isRequired,
  firstButton: PropTypes.string.isRequired,
  secondButton: PropTypes.string.isRequired,
  actionFunction: PropTypes.func.isRequired,
  functionParam: PropTypes.number,
};

ModalValidation.defaultProps = {
  functionParam: 1,
};
