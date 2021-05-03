import styled from "styled-components"; // You need this as well
import { generateMedia } from "styled-media-query";

export const mediaQueries = {
  huge: `1440px`,
  large: `1170px`,
  medium: `768px`,
  small: `450px`,
  menu: `860px`,
  waitingScreen: `550px`
};

export const mediaQuery = generateMedia(mediaQueries);
