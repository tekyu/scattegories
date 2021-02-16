import themes from "assets/themes";
import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const Answer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 14px 0;
  height: 100%;
  width: ${({ answerWidth }) => (answerWidth ? `${answerWidth}px` : `100px`)};
  ${mediaQuery.lessThan(`medium`)`
  width: auto;
  padding-right: 20px;
  padding-left: 20px;
`};
  margin: 0 4px;
  white-space: nowrap;
`;

export const AnswerText = styled.div`
  text-align: center;
  width: 100%;
  font-size: 18px;
  margin: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Points = styled.div`
  color: ${themes.default.font.primary};
  display: flex;
  position: absolute;
  bottom: -5px;
  right: 5px;
  font-size: 20px;
  transform: rotate(5deg);
  ${mediaQuery.lessThan(`medium`)`
    bottom: 5px;
  `};
`;
