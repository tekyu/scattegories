import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emitter } from "../../store/socket/socketActions";
import RippedPaper from "../../components/RippedPaper/RippedPaper";
import * as Styled from "./CreateGame.styled";

const validate = ({ username, playersMax, maxScore }) => {
  const errors = {};
  // if (!username.trim()) {
  //   errors.username = `Podaj swoje imię`;
  // }
  return errors;
};

const CreateGame = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const submitCreateGameHandler = ({ playersMax, maxScore, categories }) => {
    const roomOptions = {
      playersMax: +playersMax,
      maxScore: +maxScore,
      categories: categories || [
        "Państwo",
        "Miasto",
        "Imię",
        "Rzecz",
        "Zwierze",
        "Potrawa",
        "Rośliny"
      ]
    };
    dispatch(
      emitter("CREATE_ROOM", roomOptions, ({ error, id }) => {
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
          categories: [
            "Państwo",
            "Miasto",
            "Imię",
            "Rzecz",
            "Zwierze",
            "Potrawa",
            "Rośliny"
          ]
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitCreateGameHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          isSubmitting,
          initialValues: { playersMax, maxScore, categories }
        }) => {
          return (
            <Styled.CreateGameForm>
              <Styled.Header>Stwórz grę</Styled.Header>
              <label htmlFor="plaersMax">Maksymalna liczba graczy</label>
              <Field label="Maksymalna liczba graczy" value={playersMax} />
              <ErrorMessage name="playersMax" />
              <label htmlFor="maxScore">Limit punktów</label>
              <Field label="Limit punktów" value={maxScore} />
              <ErrorMessage name="maxScore" />
              <label htmlFor="categories">Kategorie</label>
              <Field label="Kategorie" value={categories} />
              <ErrorMessage name="maxScore" />
              <Styled.CreateGameButton type="submit" disabled={isSubmitting}>
                Wyślij
              </Styled.CreateGameButton>
            </Styled.CreateGameForm>
          );
        }}
      </Formik>
    </RippedPaper>
  );
};

export default CreateGame;
