import React from "react";
import * as Styled from "./RippedPaper.styled";

const RippedPaper = ({ padding, children, rotate }) => {
  return (
    <Styled.Container>
      <Styled.Paper padding={padding} rotate={rotate || false}>
        <Styled.Content rotate={-rotate}>{children}</Styled.Content>
      </Styled.Paper>
    </Styled.Container>
  );
};

export default RippedPaper;
