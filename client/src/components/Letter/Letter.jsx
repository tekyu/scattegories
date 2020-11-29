import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./Letter.styled";

const Letter = ({ letter = `` }) => {
  return <Styled.Letter>{letter}</Styled.Letter>;
};

Letter.propTypes = {
  letter: PropTypes.string
};

Letter.defaultProps = {
  letter: ``
};

export default Letter;
