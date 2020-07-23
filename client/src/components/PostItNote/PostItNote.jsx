import React from "react";
import * as Styled from "./PostItNote.styled";

const PostItNote = ({ children, rotate }) => {
  return (
    <Styled.Container rotate={rotate}>
      <Styled.Note>{children}</Styled.Note>
    </Styled.Container>
  );
};

export default PostItNote;
