import { useNavigate } from "react-router-dom";
import "./StepsHeader.css";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import heart from "../../assets/Icons/Hearth_Icon.svg";
import StepButtonOpen from "./StepButton";

function StepsHeader() {
  const steps = [
    {
      id: 1,
      name: "Eye",
      iconUrl: `${eye}`,
      pathName: ["/eye/stage1", "/eye/stage2"],
    },
    {
      id: 2,
      name: "Nose",
      iconUrl: `${nose}`,
      pathName: ["/nose/stage1"],
    },
    {
      id: 3,
      name: "Mouth",
      iconUrl: `${mouth}`,
      pathName: ["/mouth/stage1", "/mouth/stage2"],
    },
    {
      id: 4,
      name: "Advice",
      iconUrl: `${heart}`,
      pathName: ["/advice"],
    },
  ];

  const findPathName = (step) => {
    return step.pathName.includes(window.location.pathname);
  };

  const navigate = useNavigate();
  const handleNavigate = (step) => {
    navigate(step.pathName[0]);
  };

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
            onClick={handleNavigate}
            className="closedStepButton"
          />
        )
      )}
    </div>
  );
}

export default StepsHeader;
