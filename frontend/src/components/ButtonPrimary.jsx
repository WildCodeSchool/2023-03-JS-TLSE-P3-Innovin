import styled from "styled-components";

const ButtonPrimary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--secondaryColor);
  border-radius: 5px;
  padding: 0.5rem 2rem;
  gap: 1.5rem;
  background-color: transparent;
  color: var(--secondaryColor);
  font-size: var(--fontSizeText);
  &:hover {
    background-color: var(--secondaryColor);
    color: var(--whiteGoldColor);
  }
`;

export default ButtonPrimary;