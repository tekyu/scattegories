import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { gameSelectors } from "store/selectors";
import cloneDeep from "clone-deep";
import { sendQuestionableAnswers } from "store/game/gameActions";
import { useTranslation } from "react-i18next";
import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import { CSSTransition } from "react-transition-group";
import * as Styled from "./QuestionableAnswers.styled";
import mockAnswers from "./mockAnswers";
import AnswerElement from "./AnswerElement/AnswerElement";

const QuestionableAnswers = () => {
  const { t } = useTranslation();
  const answers = useSelector(gameSelectors.questionable);
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);
  const [redacted, setRedacted] = useState({});
  const [categoriesMap, setCategoriesMap] = useState({});
  // const answers = mockAnswers;
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
    console.log(`test`, redacted, Object.keys(redacted).length, numOfAnswers);
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
    console.log(`redactHandler`, { answerId, category, allowAnswer });
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
        <Styled.Category key={category}>
          <Styled.CategoryName>{category}</Styled.CategoryName>
          {entries.map(({ answer, answerId }) => (
            <PostItNoteDynamic
              key={answerId}
              rotate={(Math.random() * (-1 - 2.5) + 2.5).toFixed(2)}
            >
              <AnswerElement
                key={answerId}
                answerId={answerId}
                answer={answer}
                category={category}
                handler={redactHandler}
              />
            </PostItNoteDynamic>
          ))}
        </Styled.Category>
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

QuestionableAnswers.propTypes = {};

QuestionableAnswers.defaultProps = {};

export default QuestionableAnswers;
