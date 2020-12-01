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

export const InputRow = styled.div`
  z-index: 1;
  /* box-shadow: 0px 9px 28px 0px rgba(0, 0, 0, 0.3); */
  /* &:before {
    content: "";
    background: rgba(255, 255, 255, 0.87);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  } */
`;

export const Row = styled.div`
  color: #000;
  display: flex;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0;
  position: relative;
`;

export const Container = styled.div`
  position: relative;
  background: #ffff88;
  padding: 12px 0;
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

export const LetterContainer = styled.div`
  font-size: 2em;
`;

export const Answer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 0;
  height: 100%;
  width: ${({ width }) => (width ? `${width}px` : `100px`)};
  margin: 0 4px;
  white-space: nowrap;
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
    text-transform: lowercase;
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
  }
  &:focus {
    background: rgba(255, 255, 255, 1);
    border: 1px solid #000;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.54);
  }
`;

export const Button = styled.button`
  font-family: ${theme.font.primary};
  font-size: 1.4em;
  color: #000;
  transition: all 0.2s ease-in-out;
  padding: 6px 12px;
  ${({ fullRow }) =>
    fullRow &&
    `
    color: green;
    font-size: 1.4em;
    animation: ${wiggle} 0.7s linear infinite;
  `}
  &:focus, &:hover {
    color: green;
    animation: ${wiggle} 0.7s linear infinite;
  }
`;
