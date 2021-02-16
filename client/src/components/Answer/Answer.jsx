import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./Answer.styled";

const Answer = ({ answer = ``, points = null, answerWidth = 100 }) => {
  return (
    <Styled.Answer answerWidth={answerWidth}>
      <Styled.AnswerText>{answer}</Styled.AnswerText>
      <Styled.Points>{points}</Styled.Points>
    </Styled.Answer>
  );
};

Answer.propTypes = {
  answer: PropTypes.string,
  points: PropTypes.number,
  answerWidth: PropTypes.number
};

Answer.defaultProps = {
  answer: ``,
  points: null,
  answerWidth: 100
};

export default Answer;
