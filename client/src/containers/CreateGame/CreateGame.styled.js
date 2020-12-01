import styled from "styled-components";
import { Form } from "formik";
import theme from "assets/themes";

export const Header = styled.h3`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: 40px;
`;

export const CreateGameForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CreateGameButton = styled.button`
  font-family: ${theme.font.primary};
  font-size: 26px;
  background: transparent;
  border: none;
  margin-top: 40px;
  outline: none;
  cursor: pointer;
`;
