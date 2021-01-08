import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { sendAnswers } from "store/game/gameActions";
import Letter from "components/Letter/Letter";
import { useTranslation } from "react-i18next";
import { socketActions } from "store/actions";
import * as Styled from "./InputRow.styled";

const InputRow = ({
  answerWidth = 100,
  categories = [],
  forceSubmitHandler = () => {}
}) => {
  const submitButton = useRef(null);
  console.count(`[INPUTROW]`);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    console.log(`[inpurow][submitted]`, submitted);
  }, [submitted]);

  const submitAnswersHandler = answers => {
    console.log(
      `SUBMIT ANSWERS HANDLER`,
      answers,
      Object.values(answers).some(answer => !answer)
    );
    // TODO: Should validate if are empty and are not forced yet to submit
    // if (Object.values(answers).some(answer => !answer)) {
    //   // some answers are empty
    //   return false;
    // }
    const answersReadyToSubmit = Object.entries(answers).reduce(
      (obj, [key, value]) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = value.trim();
        return obj;
      },
      {}
    );
    setSubmitted(true);
    dispatch(sendAnswers(answersReadyToSubmit));
    setShowOverlay(true);
    console.log(
      `SUBMIT ANSWERS HANDLER CAN SEND REQUEST`,
      answersReadyToSubmit
    );
    return answersReadyToSubmit;
  };

  const checkForForceSubmitHandler = useCallback(() => {
    if (!submitted && submitButton && submitButton.current) {
      submitButton.current.click();
      forceSubmitHandler(false);
    }
  }, [forceSubmitHandler, submitted]);

  const waitingTimeSubmitHandler = useCallback(
    ({ data: { time } }) => {
      setTimeout(() => {
        checkForForceSubmitHandler();
      }, time);
    },
    [checkForForceSubmitHandler]
  );

  useEffect(() => {
    dispatch(socketActions.listener(`WAITING_TIME`, waitingTimeSubmitHandler));

    return () => {
      dispatch(
        socketActions.removeListener(`WAITING_TIME`, waitingTimeSubmitHandler)
      );
    };
  }, [dispatch, waitingTimeSubmitHandler]);

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
                      disabled={submitted}
                      name={answer}
                      placeholder={`${t(`inputRow.write`)} ${answer}...`}
                    />
                  </Styled.InputContainer>
                ))}
              </Styled.Answers>
            </Styled.Row>
            <Styled.Button
              disabled={submitted}
              ref={submitButton}
              type="submit"
            >
              {submitted ? t(`inputRow.waitForOthers`) : t(`inputRow.send`)}
            </Styled.Button>
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
