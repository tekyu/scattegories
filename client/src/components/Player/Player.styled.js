import styled from "styled-components";

const stateObject = {
  0: `red`,
  1: `green`,
  2: `yellow`
};

export const Container = styled.div`
  margin: 0 20px;
  display: flex;
  position: relative;
  ${({ isYou }) =>
    isYou &&
    `
    &:after {
      content: "You";
      position:absolute;
      left: 28px;
      top: -18px;
      font-size: 16px;
      color: #000;
    }
  `}
`;

export const StateIndicator = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

export const State = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: ${({ state }) => stateObject[state]};
`;

export const Username = styled.h3`
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  margin-right: 50px;
  width: 100%;
`;

export const Score = styled.p`
  margin-left: auto;
  font-size: 2rem;
`;
