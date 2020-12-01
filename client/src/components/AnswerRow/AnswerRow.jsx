import React from "react";
import PropTypes from "prop-types";

import Letter from "components/Letter/Letter";
import Answer from "components/Answer/Answer";
import * as Styled from "./AnswerRow.styled";

const AnswerRow = ({
  letter = ``,
  answerWidth = 100,
  roundPoints = null,
  answers = []
}) => {
  return (
    <Styled.Row>
      <Letter letter={letter} />
      <Styled.Answers>
        {answers.map(({ category, answer, points }) => {
          return (
            <Answer
              key={`${letter}-${category}`}
              answer={answer}
              points={points}
              width={answerWidth}
            />
          );
        })}
      </Styled.Answers>
      <Styled.Points>{roundPoints}</Styled.Points>
    </Styled.Row>
  );
};

AnswerRow.propTypes = {
  letter: PropTypes.string,
  answerWidth: PropTypes.number,
  roundPoints: PropTypes.number,
  answers: PropTypes.array
};

AnswerRow.defaultProps = {
  letter: null,
  answerWidth: 100,
  roundPoints: null,
  answers: []
};

export default AnswerRow;
