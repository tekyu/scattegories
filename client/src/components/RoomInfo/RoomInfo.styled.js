import styled, { keyframes, css } from "styled-components";
import theme from "assets/themes";

const opacityChanger = keyframes`
  0% {opacity: 1;}
  75% {opacity: 0.7;}
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

export const RoomIdParagraph = styled.div``;

export const RoomLink = styled.a`
  color: #000;
  font-size: 1.3em;
  font-family: "Covered By Your Grace", cursive;
`;

export const PlayersCountContainer = styled.div`
  display: flex;
`;

export const PlayersCountLabel = styled.div`
  margin-right: 8px;
  align-items: center;
`;

export const CopyButton = styled.button`
  position: relative;
  font-family: ${theme.font.primary};
  &:before {
    z-index: 10;
    content: "Copied";
    font-size: 2em;
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
