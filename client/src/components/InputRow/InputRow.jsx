import React, { useState } from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { sendAnswers } from "store/game/gameActions";
import Letter from "components/Letter/Letter";
import { useTranslation } from "react-i18next";
import * as Styled from "./InputRow.styled";

const InputRow = ({ answerWidth = 100, categories = [] }) => {
  console.count(`[INPUTROW]`);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showOverlay, setshowOverlay] = useState(false);
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
    setshowOverlay(true);
    console.log(
      `SUBMIT ANSWERS HANDLER CAN SEND REQUEST`,
      answersReadyToSubmit
    );
    return answersReadyToSubmit;
  };

  const setInitialValues = (array = []) => {
    return array.reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ``;
      return obj;
    }, {});
  };

  return (
    <Styled.InputRow>
      {showOverlay && <Styled.Overlay>Wait for others</Styled.Overlay>}
      <Styled.Container>
        <Formik
          initialValues={setInitialValues(categories)}
          onSubmit={submitAnswersHandler}
        >
          <Styled.InputForm>
            <Styled.Row>
              <Letter />
              <Styled.Answers>
                {categories.map(answer => (
                  <Styled.InputContainer key={answer} width={answerWidth}>
                    <Styled.InputField
                      name={answer}
                      placeholder={`${t(`inputRow.write`)} ${answer}...`}
                    />
                  </Styled.InputContainer>
                ))}
              </Styled.Answers>
            </Styled.Row>
            <Styled.Button type="submit">{t(`inputRow.send`)}</Styled.Button>
          </Styled.InputForm>
        </Formik>
      </Styled.Container>
    </Styled.InputRow>
  );
};

InputRow.propTypes = {
  categories: PropTypes.array,
  answerWidth: PropTypes.number
};

export default InputRow;
