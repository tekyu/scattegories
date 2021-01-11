import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { gameSelectors } from "store/selectors";
import cloneDeep from "clone-deep";
import * as Styled from "./QuestionableAnswers.styled";
import mockAnswers from "./mockAnswers";

const getAnswer = ({ category, answer, answerId, handler }) => {
  const answerHandler = ({ target }) => {
    const allowAnswer = target.getAttribute(`allowanswer`);
    console.log(`state`, allowAnswer);
    handler({ answerId, category, allowAnswer });
  };
  return (
    <div key={answerId} id={answerId} category={category}>
      {answer}
      <button type="button" allowanswer="yes" onClick={answerHandler}>
        Yes
      </button>
      <button type="button" allowanswer="no" onClick={answerHandler}>
        No
      </button>
    </div>
  );
};

const QuestionableAnswers = () => {
  // const answers = useSelector(gameSelectors.questionable);
  const [redacted, setRedacted] = useState({});
  const answers = mockAnswers;
  const numOfAnswers = Object.keys(answers).length;
  useEffect(() => {
    console.log(`[QuestionableAnswers][redacted]`, redacted, numOfAnswers);
    if (Object.keys(redacted).length === numOfAnswers) {
      console.log(`[QuestionableAnswers][redacted][sendHere]`);
    }
  }, [numOfAnswers, redacted]);

  const redactHandler = ({ answerId, category, allowAnswer }) => {
    console.log(`[QuestionableAnswers][redactHandler]`, category, allowAnswer);
    setRedacted(prevState => {
      return {
        ...prevState,
        [answerId]: allowAnswer
      };
    });
  };

  const getCategories = () => {
    return Object.entries(answers).map(([category, entries]) => {
      if (!entries.length > 0) {
        return null;
      }
      return (
        <div key={category}>
          <label>{category}</label>
          {entries.map(({ answer, answerId, playerId }) =>
            getAnswer({
              answer,
              playerId,
              category,
              answerId,
              handler: redactHandler
            })
          )}
        </div>
      );
    });
  };

  return (
    <Styled.QuestionableAnswers>{getCategories()}</Styled.QuestionableAnswers>
  );
};

QuestionableAnswers.propTypes = {};

QuestionableAnswers.defaultProps = {};

export default QuestionableAnswers;
