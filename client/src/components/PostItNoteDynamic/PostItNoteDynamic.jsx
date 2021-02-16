import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./PostItNoteDynamic.styled";

const PostItNoteDynamic = ({
  children,
  rotate,
  padding,
  margin,
  backgroundReadyState
}) => {
  return (
    <Styled.Container rotate={rotate}>
      <Styled.Note
        padding={padding}
        margin={margin}
        backgroundReadyState={backgroundReadyState}
      >
        {children}
      </Styled.Note>
    </Styled.Container>
  );
};

PostItNoteDynamic.propTypes = {
  children: PropTypes.array,
  rotate: PropTypes.string,
  padding: PropTypes.string,
  margin: PropTypes.string,
  backgroundReadyState: PropTypes.bool
};

export default PostItNoteDynamic;
