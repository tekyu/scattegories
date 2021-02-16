import styled from "styled-components";
import { mediaQuery } from "utils/mediaQueries";

export const Menu = styled.div`
  display: flex;
  align-items: center;

  ${mediaQuery.lessThan(`menu`)`
    flex-direction: column;
  `};
`;
