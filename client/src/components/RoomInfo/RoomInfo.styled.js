import styled, { keyframes, css } from "styled-components";
import theme from "assets/themes";
import { mediaQuery } from "utils/mediaQueries";

const opacityChanger = keyframes`
  0% {opacity: 1;}
  50% {opacity: 1;}
  75% {opacity: 0.8;}
  100% {opacity: 0;}
`;

export const RoomInfo = styled.div`
  color: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RoomIdMessage = styled.div`
  color: #000;
  font-size: 1.4em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RoomId = styled.div`
  font-size: 2em;
  color: #000;
`;

export const RoomIdParagraph = styled.div`
  font-size: 1.4rem;
`;

export const RoomLink = styled.a`
  color: #000;
  font-size: 1.3em;
  font-family: "Covered By Your Grace", cursive;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  ${mediaQuery.lessThan(`waitingScreen`)`
    width: 90vw;
  `};
`;
export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 10px 0;
  font-size: 1.5rem;
`;

export const PlayersCountContainer = styled.div`
  display: flex;
`;

export const PlayersCountLabel = styled.div`
  margin-right: 8px;
  align-items: center;
`;

export const MaxScore = styled.div`
  display: flex;
`;

export const CopyButton = styled.button`
  position: relative;
  font-family: ${theme.font.primary};
  font-size: 2.8rem;
  &:before {
    z-index: 10;
    content: "Copied";
    font-size: 1.7rem;
    font-family: ${theme.font.primary};
    background: ${theme.default.paper};
    color: ${theme.default.font.primary};
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ copied }) =>
    copied &&
    css`
        animation: ${opacityChanger} 1.5s linear;
      `}
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CategoriesHeader = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
`;

export const CategoriesPipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const CategoryPip = styled.div`
  display: flex;
  padding: 6px 12px;
  background: #1ba8b1;
  color: #e5f9fb;
  margin: 6px;
  cursor: default;
  ${({ rotate }) =>
    rotate &&
    `
    transform: rotate(${rotate}deg);
  `}
  &:hover {
    ${({ rotate }) =>
    rotate &&
    `
    transform: rotate(${rotate - 6 * (rotate > 0 ? -1 : 1)}deg);
  `}
  }
`;
