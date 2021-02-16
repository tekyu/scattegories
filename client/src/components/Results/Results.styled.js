import themes from "assets/themes";
import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const Results = styled.div`
  color: ${themes.default.font.primary};
  width: auto;
  display: flex;
  flex-direction: column;
  font-family: "Covered By Your Grace";
  margin-left: 14px;
  ${mediaQuery.lessThan(`medium`)`
    width:100%;
    margin-left: 0;
  `};
`;

export const NoResults = styled.div`
  width: 100%;
  text-align: center;
  margin: 40px 0;
  font-size: 1.8rem;
`;

export const Previous = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  font-size: 1.4rem;
`;
