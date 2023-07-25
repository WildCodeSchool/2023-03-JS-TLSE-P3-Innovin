import styled from "styled-components";

const ButtonPrimary = styled.button`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(195, 180, 138, 0.3);
  border-radius: 5px;
  padding: 0.5rem 2rem;
  gap: 1.5rem;
  background-color: rgba(195, 180, 138, 0.1);
  color: var(--secondaryColor);
  font-size: var(--fontSizeText);
  cursor: pointer;
  &:hover {
    background-color: var(--secondaryColor);
    color: var(--darkGoldColor);
    box-shadow: var(--shadow);
  }
  &:active {
    background-color: var(--primaryColor);
    box-shadow: none;
  }
`;

export default ButtonPrimary;
