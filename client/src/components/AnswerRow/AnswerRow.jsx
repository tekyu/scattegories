import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./AnswerRow.styled";

const AnswerRow = ({
  category = ``,
  answer = ``,
  points = null,
  width = 100,
  roundPoints = 0
}) => {
  return (
    <Styled.Answer key={category} width={width}>
      <Styled.AnswerText>{answer}</Styled.AnswerText>
      <Styled.Points>{points}</Styled.Points>
    </Styled.Answer>
  );
};

AnswerRow.propTypes = {
  category: PropTypes.string,
  answer: PropTypes.string,
  points: PropTypes.number,
  width: PropTypes.number,
  roundPoints: PropTypes
};

AnswerRow.defaultProps = {
  category: ``,
  answer: ``,
  points: null,
  width: 100
};

export default AnswerRow;
