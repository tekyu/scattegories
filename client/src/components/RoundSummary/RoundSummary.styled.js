import styled from "styled-components";
import theme from "assets/themes";

export const RoundSummary = styled.div`
  background: rgba(0, 0, 0, 0.87);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: auto;
`;

export const NoResults = styled.div`
  font-size: 2rem;
  text-align: center;
  margin: 20px;
`;

export const Me = styled.div`
  position: absolute;
  font-size: 1rem;
  margin-left: -20px;
  transform: rotate(-24deg);
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const RoundInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const CountdownContainer = styled.div``;

export const CountdownText = styled.div`
  font-size: 1rem;
`;
export const PointLimit = styled.div`
  font-size: 1rem;
  margin-top: 6px;
`;

export const RoundNumber = styled.div`
  font-size: 2rem;
`;

export const Players = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Player = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  padding: 6px 20px;
`;

export const Username = styled.div`
  display: flex;
  align-items: center;
`;

export const Index = styled.div`
  width: 20px;
  margin-right: 20px;
  font-size: 1.4rem;
`;

export const Score = styled.div`
  margin-left: 40px;
  font-size: 2.2rem;
`;

export const ScoreThisRound = styled.div`
  color: ${theme.default.success.main};
  font-size: 1.2rem;
  margin-left: 5px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FooterText = styled.div`
  margin-top: 40px;
  font-size: 1.4rem;
`;
