import styled from "styled-components";

const StepButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  border-radius: 3rem;
  border: ${({ findPathName, step }) =>
    findPathName(step) ? "1px solid var(--secondaryColor)" : "1px solid red"};
  width: 6rem;
  height: 6rem;
  position: relative;
  &::after,
  ::before {
    content: "";
    z-index: -1;
    border: 2px solid var(--secondaryColor);
    position: absolute;
    inset: 0.2rem;
    border-radius: 5rem;
  }
  &:hover {
    scale: 1.1;
  }
`;

export default StepButton;
