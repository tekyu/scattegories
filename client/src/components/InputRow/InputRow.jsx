import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "store/room/roomSelectors";
import { sendAnswers } from "store/game/gameActions";
import * as debounce from "lodash.debounce";
import { activeLetter } from "store/game/gameSelectors";
import Letter from "components/Letter/Letter";
import * as Styled from "./InputRow.styled";
// import { useTranslation } from "react-i18next";

const InputRow = () => {
  // const {t} = useTranslation()
  const gameCategories = useSelector(categories);
  const currentLetter = useSelector(activeLetter);
  const getWidth = (gameCategories = []) =>
    (window.innerWidth - 160) / (gameCategories.length || 1);

  const [answerWidth, setAnswerWidth] = useState(getWidth(gameCategories));
  const dispatch = useDispatch();
  const submitAnswersHandler = answers => {
    console.log(
      `SUBMIT ANSWERS HANDLER`,
      answers,
      Object.values(answers).some(answer => !answer)
    );
    if (Object.values(answers).some(answer => !answer)) {
      // some answers are empty
      return false;
    }
    const answersReadyToSubmit = Object.entries(answers).reduce(
      (obj, [key, value]) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value.trim();
        return obj;
      },
      {}
    );
    dispatch(sendAnswers(answersReadyToSubmit));
    console.log(
      `SUBMIT ANSWERS HANDLER CAN SEND REQUEST`,
      answersReadyToSubmit
    );
    return answersReadyToSubmit;
  };

  const handleResize = event => {
    setAnswerWidth(getWidth(categories));
    console.log(`resize`, window.innerWidth, getWidth(categories));
  };

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

  const mockCategories = [
    `MockPaństwo`,
    `MockMiasto`,
    `MockImię`,
    `MockRzecz`,
    `MockZwierze`,
    `MockPotrawa`,
    `Mock Rośliny Spacja`
  ];

  const setInitialValues = (array = []) => {
    return array.reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ``;
      return obj;
    }, {});
  };
  return (
    <Formik
      initialValues={setInitialValues(mockCategories)}
      onSubmit={submitAnswersHandler}
    >
      <Form>
        <Styled.Row>
          <Letter letter={currentLetter} />
          <Styled.Answers>
            {mockCategories.map(answer => (
              <Styled.InputContainer key={answer} width={answerWidth}>
                <Styled.InputField name={answer} placeholder={answer} />
              </Styled.InputContainer>
            ))}
          </Styled.Answers>
        </Styled.Row>
        <button type="submit">Wyslij</button>
      </Form>
    </Formik>
  );
};

InputRow.propTypes = {};

export default InputRow;
