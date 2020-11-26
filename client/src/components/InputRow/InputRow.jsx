import React from "react";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "store/room/roomSelectors";
import { sendAnswers } from "store/game/gameActions";
import * as Styled from "./InputRow.styled";

const InputRow = () => {
  const dispatch = useDispatch();
  const gameCategories = useSelector(categories);
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
  };

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
        <div>
          {mockCategories.map(answer => (
            <span key={answer}>
              <Field name={answer} />
            </span>
          ))}
        </div>
        <button type="submit">Wyslij</button>
      </Form>
    </Formik>
  );
};

InputRow.propTypes = {};

export default InputRow;
