import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const LogoContainer = styled.div`
  padding-top: ${({ minified }) => (minified ? `1vh` : `4vh`)};
  padding-bottom: ${({ minified }) => (minified ? `1vh` : `8vh`)};
  text-align: center;

  ${mediaQuery.lessThan(`menu`)`
  padding-top: 1vh;
  padding-bottom: 1vh;
  `};
`;

export const Header = styled.div``;

export const RoomId = styled.div``;
