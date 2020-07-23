import styled from "styled-components";

export const Logo = styled.div`
  font-size: ${({ minified }) => (minified ? `3em` : `6em`)};
  color: black;
  margin: 0 auto;
  font-family: "Caveat", cursive;
`;
