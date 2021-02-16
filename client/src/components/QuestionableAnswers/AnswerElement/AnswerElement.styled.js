import styled from "styled-components";
import themes from "assets/themes";

const colors = {
  true: `green`,
  false: `red`,
  undefined: `pink`
};

const answerColor = {
  true: `${themes.default.success.light}`,
  false: `${themes.default.error.main}`,
  undefined: `transparent`
};

export const AnswerElement = styled.div`
  display: flex;
  margin: 5px;
  padding: 10px;
  justify-content: space-between;
  background: ${({ state }) =>
    `linear-gradient(90deg, ${answerColor[state]} 0%, rgba(255,255,255,0) 80%)`};
`;

export const Answer = styled.p`
  color: #000;
  font-size: 20px;
  margin-right: 20px;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const ButtonYes = styled.button`
  font-size: 18px;
  color: ${themes.default.font.primary};
  font-family: ${themes.font.primary};
  &:hover {
    font-weight: 600;
  }
`;

export const ButtonNo = styled.button`
  font-size: 18px;
  color: ${themes.default.font.primary};
  font-family: ${themes.font.primary};
  &:hover {
    font-weight: 600;
  }
`;
