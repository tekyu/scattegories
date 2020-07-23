import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Formik, Field, ErrorMessage } from "formik";
import RippedPaper from "../../components/RippedPaper/RippedPaper";
import * as Styled from "./ChooseUsername.styled";
import * as userActions from "../../store/user/userActions";
import * as socketSelectors from "../../store/socket/socketSelectors";
import { socketActions, roomActions } from "../../store/actions";

const validate = ({ username = "" }) => {
  const errors = {};
  if (!username.trim()) {
    errors.username = `Imię nie może być puste`;
  }
  return errors;
};

const ChooseUsername = ({ roomId }) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const socketId = useSelector(socketSelectors.socketId);
  const submitUsernameHandler = ({ code, username }) => {
    dispatch(
      socketActions.emitter(
        "JOIN_ROOM",
        { roomId, username },
        ({ error, room }) => {
          if (!error) {
            roomActions.updateRoom(room);
            userActions.updatePlayer({ username, id: socketId });
          } else {
            // history.replace(`/`);
            // toast.error(roomData.error, {
            //   position: toast.POSITION.BOTTOM_RIGHT
            // });
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
          username: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          submitUsernameHandler(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values: { username } }) => {
          return (
            <Styled.JoinGameForm>
              <Styled.Header>Wybierz swoje imię</Styled.Header>
              <Field
                label="Wybierz swoje imię"
                name="username"
                value={username}
              />
              <ErrorMessage name="username" />
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

export default ChooseUsername;
