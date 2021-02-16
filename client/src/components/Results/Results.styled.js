import themes from "assets/themes";
import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const Results = styled.div`
  color: ${themes.default.font.primary};
  background: ${themes.default.paper};
  width: auto;
  display: flex;
  flex-direction: column;
  font-family: "Covered By Your Grace";
  padding-left: 14px;
  margin-top: 40px;
  box-shadow: 0px 4px 6px 0px rgba(107, 107, 107, 0.17);
  ${mediaQuery.greaterThan(`medium`)`
    margin-left: 50px;
    margin-right: 50px;
  `};
  ${mediaQuery.lessThan(`medium`)`
    width:100%;
    padding-left: 0;
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
  margin-top: 20px;
  font-size: 1.4rem;
`;
