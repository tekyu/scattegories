import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ minified }) => (minified ? `2em` : `5em`)};
`;

const FullScreenLoader = () => {
  return <StyledContainer>Scattegories</StyledContainer>;
};

export default FullScreenLoader;
