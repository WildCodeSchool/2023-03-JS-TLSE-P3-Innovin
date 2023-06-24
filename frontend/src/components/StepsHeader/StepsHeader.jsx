import { useNavigate } from "react-router-dom";
import "./StepsHeader.css";
import StepButtonOpen from "./StepButton";
import { steps } from "../../Utils";

function StepsHeader() {
  // ----------------------------------------functions to control the steps----------------------------------------------------

  // Function which verifys if the step is corresponding to the path
  const findPathName = (step) => {
    return step.pathName.includes(window.location.pathname);
  };

  // Function to navigate to the step we want
  const navigate = useNavigate();
  const handleNavigate = (step) => {
    navigate(step.pathName[0]);
  };

  // -------------------------------------------return the component----------------------------------------------------

  return (
    <div className="stepsHeader">
      {steps.map((step) =>
        findPathName(step) ? (
          <StepButtonOpen
            key={step.id}
            step={step}
            className="openStepButton"
            type="button"
          />
        ) : (
          <button
            key={step.id}
            type="button"
            aria-label={step.name}
            onClick={() => handleNavigate(step)}
            className="closedStepButton"
          />
        )
      )}
    </div>
  );
}

export default StepsHeader;
