import styled from "styled-components";
import theme from "assets/themes";

export const Countdown = styled.div`
  text-align: center;
  color: ${theme.default.font.primary};
  font-size: ${({ fontSize }) => fontSize || `40px`};
`;
