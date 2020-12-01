import styled from "styled-components";
import { Form, Field } from "formik";
import theme from "assets/themes";

export const Header = styled.h3`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 40px;
`;

export const JoinGameForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const JoinGameButton = styled.button`
  font-family: "Covered By Your Grace", cursive;
  font-size: 26px;
  background: transparent;
  border: none;
  margin-top: 40px;
  outline: none;
  cursor: pointer;
`;

export const InputLabel = styled.label`
  margin-bottom: 10px;
  margin-top: 10px;
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
