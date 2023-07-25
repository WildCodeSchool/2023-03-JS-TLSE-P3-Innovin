import { Toaster, toast } from "react-hot-toast";
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
  toastCancelledMsg,
  toastValidMsg,
}) {
  const notifyCancelled = () =>
    toast.error(toastCancelledMsg, {
      style: {
        border: "1px solid #FFCCCC",
        background: "#12110b",
        padding: "16px",
        color: "#FFCCCC",
      },
      iconTheme: {
        primary: "#850606",
        secondary: "#FFCCCC",
      },
    });

  const notifyValidation = () =>
    toast.success(toastValidMsg, {
      style: {
        border: "1px solid #B0F2B6",
        background: "#12110b",
        padding: "16px",
        color: "#B0F2B6",
      },
      iconTheme: {
        primary: "#083B32",
        secondary: "#B0F2B6",
      },
    });

  return (
    <>
      <Toaster />
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
              notifyValidation();
            }}
          >
            {firstButton}
          </ButtonPrimary>
          <ButtonPrimary
            type="button"
            className="noBtn"
            onClick={() => {
              setIsOpen(false);
              notifyCancelled();
            }}
          >
            {secondButton}
          </ButtonPrimary>
        </div>
      </div>
    </>
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
  toastCancelledMsg: PropTypes.string,
  toastValidMsg: PropTypes.string,
};

ModalValidation.defaultProps = {
  functionParam: 1,
  toastValidMsg: "Action valide",
  toastCancelledMsg: "Action annulée",
};
