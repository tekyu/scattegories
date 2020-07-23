import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import sillyname from "sillyname";
import { Formik, Field, ErrorMessage } from "formik";
import RippedPaper from "../../components/RippedPaper/RippedPaper";
import * as Styled from "./JoinGame.styled";
import * as socketActions from "../../store/socket/socketActions";
import { userActions, roomActions } from "../../store/actions";
import "react-toastify/dist/ReactToastify.css";

const validate = ({ username = "", code = "" }) => {
  const errors = {};
  if (!username.trim()) {
    errors.username = `Imię nie może być puste`;
  }
  if (!code.trim()) {
    errors.code = `Kod gry nie może być pusty`;
  }
  return errors;
};

const JoinGame = ({ roomId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const submitJoinGameHandler = ({ code, username }) => {
    console.log("SUBMIT", code, username);
    const roomCode = roomId || code;
    dispatch(
      socketActions.emitter(
        "JOIN_ROOM",
        { roomId: roomCode, username },
        ({ error, room, user }) => {
          if (!error) {
            dispatch(userActions.updatePlayer(user));
            dispatch(roomActions.updateRoom(room));
            if (!roomId) {
              history.push(`/game/${room.id}`);
            }
          } else {
            history.push(`/`);
            toast.error(error, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
          }
        }
      )
    );
  };

  return (
    <RippedPaper rotate={-2}>
      <Formik
        validate={validate}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          code: roomId || "",
          username: sillyname()
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitJoinGameHandler(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values: { code, username } }) => {
          return (
            <Styled.JoinGameForm>
              <Styled.Header>Dołącz do gry</Styled.Header>
              <label htmlFor="username">Wybierz swoje imię</label>
              <Field label="Wpisz kod gry" name="username" value={username} />
              <ErrorMessage name="username" />
              {!roomId && (
                <React.Fragment>
                  <label htmlFor="code">Wpisz kod gry</label>
                  <Field label="Wpisz kod gry" name="code" value={code} />
                  <ErrorMessage name="code" />
                </React.Fragment>
              )}
              <Styled.JoinGameButton type="submit" disabled={isSubmitting}>
                Wyślij
              </Styled.JoinGameButton>
            </Styled.JoinGameForm>
          );
        }}
      </Formik>
    </RippedPaper>
  );
};

export default JoinGame;
