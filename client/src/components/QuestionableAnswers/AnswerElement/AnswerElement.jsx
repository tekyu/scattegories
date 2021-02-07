import React, { useState } from "react";
import PropTypes from "prop-types";

import * as Styled from "./AnswerElement.styled";

const AnswerElement = ({ category, answer, answerId, handler }) => {
  const [state, setState] = useState(undefined);
  console.log(`AnswerElement`, state);
  // TODO: refactor buttons to have generic button and button with
  // stateHandler which is extending generic button
  const answerHandler = ({ target }) => {
    const allowAnswer = target.getAttribute(`data-state`);
    console.log(`state`, allowAnswer);
    handler({ answerId, category, allowAnswer });
    setState(allowAnswer === `yes`);
  };

  return (
    <Styled.AnswerElement id={answerId} category={category}>
      <Styled.Answer>{answer}</Styled.Answer>

      <Styled.ButtonYes
        type="button"
        state={state}
        data-state="yes"
        onClick={answerHandler}
      >
        Yes
      </Styled.ButtonYes>
      <Styled.ButtonNo
        type="button"
        state={state}
        data-state="no"
        onClick={answerHandler}
      >
        No
      </Styled.ButtonNo>
    </Styled.AnswerElement>
  );
};

AnswerElement.propTypes = {
  category: PropTypes.string,
  answer: PropTypes.string,
  answerId: PropTypes.string,
  handler: PropTypes.func,
  state: PropTypes.bool
};

AnswerElement.defaultProps = {};

export default AnswerElement;
