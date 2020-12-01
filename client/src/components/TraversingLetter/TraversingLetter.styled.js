import styled from "styled-components";
import theme from "assets/themes";

export const TraversingLetter = styled.div`
  color: ${theme.default.font.primary};
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  outline: none;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: solid 2px #41403e;
`;

export const Letter = styled.div`
  width: 30px;
  font-size: 60px;
  color: ${theme.default.font.primary};
  font-family: ${theme.font.primary};
  text-transform: uppercase;
`;
