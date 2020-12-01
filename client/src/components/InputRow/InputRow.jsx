import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "store/room/roomSelectors";
import { sendAnswers } from "store/game/gameActions";
import * as debounce from "lodash.debounce";
import { activeLetter } from "store/game/gameSelectors";
import Letter from "components/Letter/Letter";
import { useTranslation } from "react-i18next";
import * as Styled from "./InputRow.styled";

const InputRow = ({ answerWidth = 100, categories = [] }) => {
  console.count(`[INPUTROW]`);
  const { t } = useTranslation();
  // const gameCategories = useSelector(categories);
  const currentLetter = useSelector(activeLetter);
  // const getWidth = (gameCategories = []) =>
  //   (window.innerWidth - 160) / (gameCategories.length || 1);

  // const [answerWidth, setAnswerWidth] = useState(getWidth(gameCategories));
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

  // const handleResize = event => {
  //   setAnswerWidth(getWidth(gameCategories));
  //   console.log(`resize`, window.innerWidth, getWidth(gameCategories));
  // };

  // useEffect(() => {
  //   window.addEventListener(
  //     `resize`,
  //     debounce(handleResize, 300, {
  //       leading: false,
  //       trailing: true
  //     })
  //   );

  //   return () => {
  //     window.removeEventListener(
  //       `resize`,
  //       debounce(handleResize, 300, {
  //         leading: true,
  //         trailing: true
  //       })
  //     );
  //   };
  // });

  const setInitialValues = (array = []) => {
    return array.reduce((obj, key) => {
      // eslint-disable-next-line no-param-reassign
      obj[key] = ``;
      return obj;
    }, {});
  };
  return (
    <Styled.InputRow>
      <Styled.Container>
        <Formik
          initialValues={setInitialValues(categories)}
          onSubmit={submitAnswersHandler}
        >
          <Styled.InputForm>
            <Styled.Row>
              <Letter letter={currentLetter} />
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
