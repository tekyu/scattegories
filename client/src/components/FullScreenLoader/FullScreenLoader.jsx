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
  color: red;
  align-items: center;
  justify-content: center;
`;

const FullScreenLoader = () => {
  return <StyledContainer>Logo</StyledContainer>;
};

export default FullScreenLoader;
