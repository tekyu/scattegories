import React from "react";
import * as Styled from "./PostItNoteDynamic.styled";

const PostItNoteDynamic = ({ children, rotate }) => {
  return (
    <Styled.Container rotate={rotate}>
      <Styled.Note>{children}</Styled.Note>
    </Styled.Container>
  );
};

export default PostItNoteDynamic;
