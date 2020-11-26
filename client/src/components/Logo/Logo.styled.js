import styled from "styled-components";

export const Logo = styled.div`
  font-size: ${({ minified }) => (minified ? `2em` : `5em`)};
  color: black;
  font-family: "Caveat", cursive;
`;
