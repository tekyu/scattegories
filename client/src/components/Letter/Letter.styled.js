import styled from "styled-components";
import theme from "assets/themes";

export const Letter = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  min-width: 30px;
  font-family: ${theme.font.primary};
  font-size: 34px;
  text-transform: uppercase;
`;
