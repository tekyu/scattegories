import React from "react";
import PropTypes from "prop-types";

import * as Styled from "./DisplayRow.styled";

const DisplayRow = () => {
  return (
    <Styled.Row key={letter}>
      <Styled.Letter>{letter}</Styled.Letter>
      <Styled.Answers>
        {answers.map(({ category, answer, points }) => {
          return (
            <Styled.Answer key={category}>
              <Styled.AnswerText>{answer}</Styled.AnswerText>
              <Styled.Points>{points}</Styled.Points>
            </Styled.Answer>
          );
        })}
      </Styled.Answers>
    </Styled.Row>
  );
};

DisplayRow.propTypes = {};

export default DisplayRow;
