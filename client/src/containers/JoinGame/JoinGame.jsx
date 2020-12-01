import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import sillyname from "sillyname";
import { Formik, ErrorMessage } from "formik";
import RippedPaper from "../../components/RippedPaper/RippedPaper";
import * as Styled from "./JoinGame.styled";
import * as socketActions from "../../store/socket/socketActions";
import { userActions, roomActions } from "../../store/actions";
import "react-toastify/dist/ReactToastify.css";

const JoinGame = ({ roomId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const validate = ({ username = ``, code = `` }) => {
    const errors = {};
    if (!username.trim()) {
      errors.username = t(`joinForm.errors.username`);
    }
    if (!code.trim()) {
      errors.code = t(`joinForm.errors.gameCode`);
    }
    return errors;
  };

  const submitJoinGameHandler = ({ code, username }) => {
    const roomCode = roomId || code;
    dispatch(
      socketActions.emitter(
        `JOIN_ROOM`,
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
          code: roomId || ``,
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
              <Styled.Header>{t(`joinForm.header`)}</Styled.Header>
              <Styled.InputLabel htmlFor="username">
                {t(`joinForm.username`)}
              </Styled.InputLabel>
              <Styled.InputField
                label="Wpisz swój nick"
                name="username"
                value={username}
                placeholder="Wpisz swój nick"
              />
              <ErrorMessage name="username" />
              {!roomId && (
                <React.Fragment>
                  <Styled.InputLabel htmlFor="code">
                    {t(`joinForm.gameCode`)}
                  </Styled.InputLabel>
                  <Styled.InputField
                    label="Wpisz kod gry"
                    name="code"
                    value={code}
                    placeholder="Wpisz kod gry"
                  />
                  <ErrorMessage name="code" />
                </React.Fragment>
              )}
              <Styled.JoinGameButton type="submit" disabled={isSubmitting}>
                {t(`joinForm.submit`)}
              </Styled.JoinGameButton>
            </Styled.JoinGameForm>
          );
        }}
      </Formik>
    </RippedPaper>
  );
};

export default JoinGame;
