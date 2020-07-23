import styled from "styled-components";
import { Form } from "formik";

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
