import styled from "styled-components";

export const LogoContainer = styled.div`
  padding-top: ${({ minified }) => (minified ? `2vh` : `8vh`)};
  padding-bottom: ${({ minified }) => (minified ? `2vh` : `16vh`)};
  text-align: center;
`;
