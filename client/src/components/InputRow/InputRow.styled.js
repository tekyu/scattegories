import styled, { keyframes } from "styled-components";
import { Field, Form } from "formik";
import theme from "assets/themes";

const wiggle = keyframes`
  0% {transform: rotate(0deg);}
  25% {transform: rotate(-5deg);}
  50% {transform: rotate(15deg);}
  75% {transform: rotate(-10deg);}
  100% {transform: rotate(0deg);}
`;

export const InputRow = styled.div``;

export const Row = styled.div`
  color: #000;
  display: flex;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0;
  position: relative;
`;

export const InputForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Answers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  width: ${({ width }) => (width ? `${width}px` : `100px`)};
  margin: 0 4px;
  white-space: nowrap;
`;

export const InputField = styled(Field)`
  padding: 14px 2px;
  width: 100%;
  height: 100%;
  margin: 0 2px;
  background: transparent;
  transition: all 0.3s ease-in-out;
  font-family: ${theme.font.primary};
  background: rgba(255, 255, 255, 0.87);
  border: 1px solid transparent;
  text-align: center;
  &::placeholder {
    text-align: center;
    color: rgba(0, 0, 0, 0.87);
  }
  &:focus {
    background: rgba(255, 255, 255, 1);
    border: 1px solid #000;
  }
`;

export const Button = styled.button`
  font-family: ${theme.font.primary};
  font-size: 1.2em;
  color: #000;
  transition: all 0.2s ease-in-out;
  ${({ fullRow }) =>
    fullRow &&
    `
    color: green;
    font-size: 1.4em;
    animation: ${wiggle} 0.7s linear infinite;
  `}
  &:focus {
    color: green;
    font-size: 1.4em;
    animation: ${wiggle} 0.7s linear infinite;
  }
`;
