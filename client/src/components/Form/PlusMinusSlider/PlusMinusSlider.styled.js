import styled from "styled-components";

export const Slider = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Covered By Your Grace", cursive;
  font-size: 26px;
  align-items: center;
  padding: 10px 0;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.78);
  font-family: "Covered By Your Grace", cursive;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const Minus = styled(Button)`
  cursor: pointer;
  &:hover,
  &:active {
    color: red;
  }
`;

export const Input = styled.input`
  text-align: center;
  border: none;
  background: transparent;
  font-family: "Covered By Your Grace", cursive;
  font-size: 26px;
  max-width: auto;
  ${({ maxWidth }) =>
    maxWidth &&
    `
    max-width: ${maxWidth}px;
  `}
`;

export const Plus = styled(Button)`
  cursor: pointer;
  &:hover,
  &:active {
    color: green;
  }
`;

export const InputContainer = styled.div`
  width: auto;
`;
