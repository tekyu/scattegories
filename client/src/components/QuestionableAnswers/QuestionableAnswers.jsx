import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { gameSelectors } from "store/selectors";
import cloneDeep from "clone-deep";
import * as Styled from "./QuestionableAnswers.styled";
import mockAnswers from "./mockAnswers";

const getAnswer = ({ playerId, category, answer }) => {
  return (
    <div id={playerId} playerId={playerId} category={category}>
      {answer}
      <button type="button">Yes</button>
      <button type="button">No</button>
    </div>
  );
};

const QuestionableAnswers = () => {
  // const answers = useSelector(gameSelectors.questionable);
  const [redacted, setRedacted] = useState({});
  const answers = mockAnswers;

  useEffect(() => {
    console.log(`[QuestionableAnswers][redacted]`, redacted);
  }, [redacted]);

  const redactHandler = ({ answer, playerId, category, state }) => {
    console.log(
      `[QuestionableAnswers][redactHandler]`,
      answer,
      playerId,
      category,
      state
    );
    // setRedacted(prevState => {
    //   const newState = cloneDeep(prevState);
    //   newState[category] =
    // });
  };

  const getCategories = () => {
    return Object.entries(answers).map(([category, entries]) => {
      if (!entries.length > 0) {
        return null;
      }
      return (
        <div key={category}>
          <label>{category}</label>
          {entries.map(({ answer, playerId }) =>
            getAnswer({ answer, playerId, category })
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
