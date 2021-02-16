import React from "react";
import PropTypes from "prop-types";

import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import * as Styled from "./AnswersCategory.styled";
import AnswerElement from "../AnswerElement/AnswerElement";

const AnswersCategory = ({ category, redactHandler, entries }) => {
  return (
    <Styled.AnswersCategory>
      <PostItNoteDynamic margin="0px" padding="20px 10px">
        <Styled.CategoryName>{category}</Styled.CategoryName>
        {entries.map(({ answer, answerId }) => (
          <AnswerElement
            key={answerId}
            answerId={answerId}
            answer={answer}
            category={category}
            handler={redactHandler}
          />
        ))}
      </PostItNoteDynamic>
    </Styled.AnswersCategory>
  );
};

AnswersCategory.propTypes = {
  category: PropTypes.string,
  redactHandler: PropTypes.func,
  entries: PropTypes.array
};

AnswersCategory.defaultProps = {};

export default AnswersCategory;
