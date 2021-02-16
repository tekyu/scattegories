import React from "react";
import PropTypes from "prop-types";
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

RippedPaper.propTypes = {
  padding: PropTypes.string,
  children: PropTypes.element,
  rotate: PropTypes.string
};

export default RippedPaper;
