import styled from "styled-components";

export const PlayersCount = styled.div`
  display: flex;
  align-items: center;
`;

export const Current = styled.div`
  font-size: ${({ current, max }) => (current === max ? `1.4em` : `1em`)};
`;
export const Divider = styled.div`
  font-size: 0.8em;
  font-weight: 600;
`;

export const Max = styled.div`
  font-size: 1.4em;
`;
