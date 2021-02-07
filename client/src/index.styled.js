import { createGlobalStyle } from "styled-components";
import theme from "assets/themes";

export const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
  font-family: ${theme.font.primary};
  background: ${theme.default.background};
  /* background: ${theme.dark.background}; */
  color: ${theme.default.font.primary};
  /* color: ${theme.dark.font.primary}; */
  background-image: linear-gradient(
      0deg,
      transparent 5em,
      rgba(255, 0, 0, 1) 0,
      transparent 5.1em
    ),
    linear-gradient(rgba(0, 0, 200, 0.1) 1px, transparent 0);
  background-size: 100% 2em;
  min-height: 100vh; //TEMP

    /* color: ${props => (props.whiteColor ? `white` : `black`)}; */
  }
  
  * {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  font-size: 14px;
  font-family: "Hammersmith One";
  cursor: pointer;
}

button {
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
}

`;
