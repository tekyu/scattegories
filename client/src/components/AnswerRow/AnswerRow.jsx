import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Letter from "components/Letter/Letter";
import Answer from "components/Answer/Answer";
import * as debounce from "lodash.debounce";
import * as Styled from "./AnswerRow.styled";

const AnswerRow = ({
  letter = ``,
  answerWidth = 100,
  roundPoints = null,
  answers = []
}) => {
  const [siteWidth, setSiteWidth] = useState(0);
  const [minimized, setMinimized] = useState(true);
  const handleResize = () => {
    setSiteWidth(window.innerWidth);
  };

  useEffect(() => {
    setSiteWidth(window.innerWidth);
    if (siteWidth < 768) {
      setMinimized(true);
    } else {
      setMinimized(false);
    }
  }, [siteWidth]);

  useEffect(() => {
    window.addEventListener(
      `resize`,
      debounce(handleResize, 300, {
        leading: false,
        trailing: true
      })
    );

    return () => {
      window.removeEventListener(
        `resize`,
        debounce(handleResize, 300, {
          leading: true,
          trailing: true
        })
      );
    };
  });

  const onClickHandler = () => {
    if (siteWidth < 768) {
      setMinimized(prev => !prev);
    } else {
      setMinimized(true);
    }
  };

  return (
    <Styled.Row onClick={onClickHandler} minimized={minimized}>
      <Letter letter={letter} />
      <Styled.Answers>
        {answers.map(({ category, answer, points }) => {
          return (
            <Answer
              key={`${letter}-${category}`}
              answer={answer}
              points={points}
              answerWidth={answerWidth}
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
