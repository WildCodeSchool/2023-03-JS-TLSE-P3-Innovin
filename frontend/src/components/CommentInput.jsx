import styled from "styled-components";

const CommentInput = styled.input`
  display: block;
  background-color: transparent;
  color: var(--whiteGoldColor);
  font-weight: 100;
  border: none;
  font-size: var(--fontSizeText);
  border-bottom: 2px solid var(--smoothWhiteColor);
  &:focus,
  &:active {
    outline: none;
  }
`;

export default CommentInput;
