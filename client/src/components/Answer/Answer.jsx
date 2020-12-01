import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./Answer.styled";

const Answer = ({ answer = ``, points = null, width = 100 }) => {
  return (
    <Styled.Answer width={width}>
      <Styled.AnswerText>{answer}</Styled.AnswerText>
      <Styled.Points>{points}</Styled.Points>
    </Styled.Answer>
  );
};

Answer.propTypes = {
  answer: PropTypes.string,
  points: PropTypes.number,
  width: PropTypes.number
};

Answer.defaultProps = {
  answer: ``,
  points: null,
  width: 100
};

export default Answer;
