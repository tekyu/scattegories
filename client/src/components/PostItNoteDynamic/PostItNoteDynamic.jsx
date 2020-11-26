import React from "react";
import * as Styled from "./PostItNoteDynamic.styled";

const PostItNoteDynamic = ({
  children,
  rotate,
  margin,
  backgroundReadyState
}) => {
  return (
    <Styled.Container rotate={rotate}>
      <Styled.Note backgroundReadyState={backgroundReadyState}>
        {children}
      </Styled.Note>
    </Styled.Container>
  );
};

export default PostItNoteDynamic;
