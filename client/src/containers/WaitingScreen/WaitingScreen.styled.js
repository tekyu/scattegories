import styled from "styled-components";

export const WaitingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  color: #000;
  font-size: 2em;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  background: rgba(255, 255, 255, 0.87);
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1;
`;

export const CountdownText = styled.div`
  margin-bottom: 20px;
`;
