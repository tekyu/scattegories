import styled, { keyframes } from "styled-components";
import { Field, Form } from "formik";
import theme from "assets/themes";
import { mediaQuery } from "utils/mediaQueries";

const wiggle = keyframes`
  0% {transform: rotate(0deg);}
  25% {transform: rotate(-5deg);}
  50% {transform: rotate(15deg);}
  75% {transform: rotate(-10deg);}
  100% {transform: rotate(0deg);}
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: ${theme.default.font.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6em;
`;

export const InputRow = styled.div`
  position: relative;
  /* z-index: 1; */
  ${mediaQuery.lessThan(`medium`)`
    width:100%;
  `};
`;

export const Row = styled.div`
  color: ${theme.default.font.primary};
  display: flex;
  padding: 10px 0;
  position: relative;
  width: auto;
  max-width: 1800px;
  ${mediaQuery.lessThan(`medium`)`
    width:100%;
  `};
`;

export const Container = styled.div`
  position: relative;
  background: #ffff88;
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
  ${mediaQuery.lessThan(`medium`)`
    flex-direction: column;
    width:100%;
  `};
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
  margin: 0 4px;
  white-space: nowrap;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  margin: 0 4px;
  white-space: nowrap;
  padding-top: 10px;
  width: ${({ answerWidth }) => (answerWidth ? `${answerWidth}px` : `100px`)};
  transition: width 0.2s ease-in-out;
  ${mediaQuery.lessThan(`medium`)`
    width:60%;
    margin: 0 10px;
    margin-top: 10px;
  `};
  ${mediaQuery.lessThan(`small`)`
    width:80%;
    margin: 0 10px;
    margin-top: 10px;
  `};
`;

export const Category = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

export const InputField = styled(Field)`
  padding: 14px 2px;
  width: 100%;
  height: 100%;
  margin: 0 2px;
  transition: all 0.3s ease-in-out;
  font-family: ${theme.font.primary};
  pointer-events: ${({ disabled }) => (disabled ? `none` : `auto`)};
  background: ${({ disabled }) =>
    disabled ? `rgba(230, 230, 230, 0.87)` : `rgba(255, 255, 255, 0.87)`};
  border: 1px solid rgba(0, 0, 0, 0.14);
  text-align: center;
  &::placeholder {
    text-transform: lowercase;
    text-align: center;
    color: rgba(0, 0, 0, 0.54);
  }
  &:focus {
    background: rgba(255, 255, 255, 1);
    border: 1px solid ${theme.default.font.primary};
  }
  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.54);
  }
`;

export const Button = styled.button`
  font-family: ${theme.font.primary};
  font-size: 1.4em;
  color: ${theme.default.font.primary};
  transition: all 0.2s ease-in-out;
  padding: 6px 12px;
  pointer-events: ${({ disabled }) => (disabled ? `none` : `auto`)};
  ${({ fullRow }) =>
    fullRow &&
    `
    color: green;
    font-size: 1.4em;
    animation: ${wiggle} 0.7s linear infinite;
  `}

  ${mediaQuery.lessThan(`medium`)`
    padding: 12px;
  `};

  &:focus,
  &:hover {
    color: green;
    animation: ${wiggle} 0.7s linear infinite;
  }
`;
