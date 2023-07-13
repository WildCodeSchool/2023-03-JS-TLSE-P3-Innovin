import styled from "styled-components";

const Input = styled.input`
  display: block;
  background-color: transparent;
  color: var(--whiteGoldColor);
  font-weight: 100;
  border: none;
  font-size: var(--fontSizeText);
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--smoothWhiteColor);
  &:focus,
  &:active {
    outline: none;
  }
`;

export default Input;
