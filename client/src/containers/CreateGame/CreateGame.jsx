import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emitter } from "store/socket/socketActions";
import RippedPaper from "components/RippedPaper/RippedPaper";
import PlusMinusSlider from "components/Form/PlusMinusSlider/PlusMinusSlider";
import { useTranslation } from "react-i18next";
import CategoriesMultiSelect from "components/CategoriesMultiSelect/CategoriesMultiSelect";
import * as Styled from "./CreateGame.styled";

const CreateGame = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const validate = values => {
    const errors = {};
    if (values.categories.length <= 0) {
      errors.categories = t(`createForm.errors.categories`);
    }
    return errors;
  };

  const submitCreateGameHandler = ({
    playersMax,
    maxScore,
    categories,
    timePerRound
  }) => {
    const roomOptions = {
      playersMax: +playersMax,
      maxScore: +maxScore,
      categories,
      timePerRound
    };
    console.log(`CREATE GAME SUBMIT`, categories);
    dispatch(
      emitter(`CREATE_ROOM`, roomOptions, ({ error, id }) => {
        if (!error) {
          history.push(`/game/${id}`);
        }
      })
    );
  };

  return (
    <RippedPaper rotate={2}>
      <Formik
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          maxScore: 100,
          playersMax: 4,
          categories: t(`createForm.initialCategories`).split(`,`),
          timePerRound: 30
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitCreateGameHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          initialValues: { playersMax, maxScore, categories, timePerRound }
        }) => {
          return (
            <Styled.CreateGameForm>
              <Styled.Header>{t(`createForm.header`)}</Styled.Header>
              <label htmlFor="playersMax">{t(`createForm.playersmax`)}</label>
              <PlusMinusSlider
                name="playersMax"
                initialValue={playersMax}
                minValue={2}
                maxValue={10}
              />
              <ErrorMessage name="playersMax" />
              <label htmlFor="maxScore">{t(`createForm.maxscore`)}</label>
              <PlusMinusSlider
                name="maxScore"
                initialValue={maxScore}
                minValue={100}
                maxValue={1500}
                step={10}
              />
              <ErrorMessage name="timePerRound" />
              <label htmlFor="timePerRound">
                {t(`createForm.timePerRound`)}
              </label>
              <PlusMinusSlider
                name="timePerRound"
                initialValue={timePerRound}
                minValue={5}
                maxValue={300}
                step={5}
              />
              <ErrorMessage name="timePerRound" />
              <label htmlFor="categories">{t(`createForm.categories`)}</label>
              <CategoriesMultiSelect
                name="CategoriesMultiSelect"
                initialValue={categories}
              />
              <Styled.CreateGameButton type="submit" disabled={isSubmitting}>
                {t(`createForm.submit`)}
              </Styled.CreateGameButton>
            </Styled.CreateGameForm>
          );
        }}
      </Formik>
    </RippedPaper>
  );
};

export default CreateGame;
