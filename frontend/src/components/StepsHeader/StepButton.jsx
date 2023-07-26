import styled from "styled-components";

const StepButtonOpen = styled.button`
  background: ${({ step }) => `url(${step.iconUrl})`};
  background-size: 2.5rem;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 3rem;
  border: 1px solid var(--secondaryColor);
  width: 4.5rem;
  height: 4.5rem;
  position: relative;
  cursor: pointer;
  &::after,
  ::before {
    content: "";
    border: 2px solid var(--secondaryColor);
    position: absolute;
    inset: 0.2rem;
    border-radius: 5rem;
  }
  &:hover {
    scale: 1.1;
  }
`;

export default StepButtonOpen;
