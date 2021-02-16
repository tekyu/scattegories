import themes from "assets/themes";
import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const Row = styled.div`
  color: ${themes.default.font.primary};
  display: flex;
  justify-content: center;
  width: auto;
  max-width: 1800px;
  margin: 5px 0;
  padding: 10px 0;
  position: relative;
  overflow: hidden;
  ${mediaQuery.lessThan(`medium`)`
    height:${({ minimized }) => (minimized ? `50px` : `100%`)};
    padding: ${({ minimized }) => (minimized ? `0` : `0  0 10px 0`)};
    background: ${themes.default.paper}
`};
`;

export const Answers = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${mediaQuery.lessThan(`medium`)`
    flex-direction:column;
    align-self: flex-start;
    width:100%;
  `};
`;

export const Points = styled.div`
  font-size: 1.6em;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border-bottom: solid 1px rgba(0, 0, 0, 0.28);
  transform: rotate(0.1deg);
`;
