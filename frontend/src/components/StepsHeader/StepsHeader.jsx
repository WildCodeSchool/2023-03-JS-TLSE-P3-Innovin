import styled from "styled-components";
import eye from "../../assets/Icons/Eye_Icon.svg";
import nose from "../../assets/Icons/Nose_Icon.svg";
import mouth from "../../assets/Icons/Mouth_Icon.svg";
import heart from "../../assets/Icons/Hearth_Icon.svg";
import StepButton from "./StepButton";

const Steps = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

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

  return (
    <Steps>
      {steps.map((step) => (
        <StepButton
          key={step.id}
          step={step}
          findPathName={findPathName}
          className="stepButton"
          type="button"
        >
          <img className="stepIcon" src={step.iconUrl} alt="icon" />
        </StepButton>
      ))}
    </Steps>
  );
}

export default StepsHeader;
