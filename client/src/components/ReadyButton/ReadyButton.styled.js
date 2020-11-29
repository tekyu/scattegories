import styled from "styled-components";
import theme from "assets/themes";

export const ReadyButton = styled.button`
  font-family: ${theme.font.primary};
  font-size: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReadyState = styled.span`
  /* font-family: ${theme.font.primary};
  font-size: 2em; */
`;

export const Divider = styled.div`
  margin: 0 12px;
`;

export const Unready = styled.div`
  /* color: rgba(0, 0, 0, 0.38);
  color: red; */
  color: ${({ ready }) => (ready ? `rgba(0, 0, 0, 0.38)` : `red`)};
  font-size: ${({ ready }) => (ready ? `1em` : `1.2em`)};
  &:hover {
    color: red;
  }
`;

export const Ready = styled.div`
  /* color: green;
  color: rgba(0, 0, 0, 0.38); */
  color: ${({ ready }) => (ready ? `green` : `rgba(0, 0, 0, 0.38)`)};
  font-size: ${({ ready }) => (ready ? `1.2em` : `1em`)};
  &:hover {
    color: green;
  }
`;
