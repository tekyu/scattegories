import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { sendQuestionableAnswers } from "store/game/gameActions";
import { useTranslation } from "react-i18next";
import { CSSTransition } from "react-transition-group";
import * as Styled from "./QuestionableAnswers.styled";
import AnswersCategory from "./AnswersCategory/AnswersCategory";

const QuestionableAnswers = ({ answers = [] }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);
  const [redacted, setRedacted] = useState({});
  const [categoriesMap, setCategoriesMap] = useState({});
  const numOfAnswers = answers.length;

  useEffect(() => {
    const categories = answers.reduce((acc, answer) => {
      if (!acc[answer.category]) {
        // eslint-disable-next-line no-param-reassign
        acc[answer.category] = [];
      }
      acc[answer.category].push(answer);
      return acc;
    }, {});
    setCategoriesMap(categories);
  }, [answers]);

  useEffect(() => {
    if (
      numOfAnswers > 0 &&
      Object.keys(redacted).length > 0 &&
      Object.keys(redacted).length === numOfAnswers
    ) {
      dispatch(sendQuestionableAnswers(redacted));
      setSent(true);
    }
  }, [answers, dispatch, numOfAnswers, redacted]);

  const redactHandler = ({ answerId, category, allowAnswer }) => {
    setRedacted(prevState => {
      return {
        ...prevState,
        [answerId]: { category, allow: allowAnswer }
      };
    });
  };

  const getCategories = () => {
    return Object.entries(categoriesMap).map(([category, entries]) => {
      if (!entries.length > 0) {
        return null;
      }
      return (
        <AnswersCategory
          category={category}
          key={category}
          redactHandler={redactHandler}
          entries={entries}
        />
      );
    });
  };

  return (
    <CSSTransition in appear classNames="questionable" timeout={200}>
      <Styled.QuestionableAnswers>
        {!sent ? (
          <>
            <Styled.Question>{t(`game.questionableQuestion`)}</Styled.Question>
            <Styled.Categories>{getCategories()}</Styled.Categories>
          </>
        ) : (
            <CSSTransition in appear classNames="wait" timeout={300}>
              <Styled.Wait>Please wait for others</Styled.Wait>
            </CSSTransition>
          )}
      </Styled.QuestionableAnswers>
    </CSSTransition>
  );
};

QuestionableAnswers.propTypes = {
  answers: PropTypes.array
};

QuestionableAnswers.defaultProps = {};

export default QuestionableAnswers;
