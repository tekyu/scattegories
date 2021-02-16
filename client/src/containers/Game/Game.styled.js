import themes from "assets/themes";
import styled from "styled-components";

export const Game = styled.div``;

export const LetterContainer = styled.div`
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  justify-content: center;
`;

export const LetterText = styled.div`
  color: #000;
  padding-right: 20px;
  font-size: 1.6em;
`;

export const RoundEnding = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: ${themes.default.paper};
  color: ${themes.default.font.primary};
  position: fixed;
  box-shadow: 0px 4px 6px 0px rgba(107, 107, 107, 0.17);
  top: 0;
  width: 100vw;
  left: 0;
  padding: 10px;
`;

export const RoundEndingText = styled.div`
  margin-right: 10px;
`;
