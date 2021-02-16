import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./PostItNote.styled";

const PostItNote = ({ children, rotate, height }) => {
  return (
    <Styled.Container rotate={rotate}>
      <Styled.Note height={height}>{children}</Styled.Note>
    </Styled.Container>
  );
};

PostItNote.propTypes = {
  children: PropTypes.element,
  rotate: PropTypes.string,
  height: PropTypes.number
};

export default PostItNote;
