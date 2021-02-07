import styled from "styled-components";

const colors = {
  true: `green`,
  false: `red`,
  undefined: `pink`
};

export const AnswerElement = styled.div`
  display: flex;
  /* padding: 10px; */
  /* margin: 10px; */
`;

export const Answer = styled.p`
  color: #000;
  font-size: 20px;
  margin-right: 20px;
`;

export const ButtonYes = styled.button`
font-size: 16px;
  /* font-size: ${({ state }) => (state === true ? `20px` : `16px`)}; */
  color: ${({ state }) =>
    state === true ? `${colors[state]}` : `${colors[undefined]}`};
  &:hover {
    color: ${colors.true};
  }
`;

export const ButtonNo = styled.button`
font-size: 16px;
  /* font-size: ${({ state }) => (state === false ? `20px` : `16px`)}; */
  color: ${({ state }) =>
    state === false ? `${colors[state]}` : `${colors[undefined]}`};
  &:hover {
    color: ${colors.false};
  }
`;
