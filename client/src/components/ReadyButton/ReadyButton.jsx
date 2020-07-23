import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "../../store/selectors";
import { userActions, socketActions } from "../../store/actions";

const ReadyButton = () => {
  const dispatch = useDispatch();
  const userState = useSelector(userSelectors.state);

  const readyHandler = () => {
    dispatch(userActions.changeState(userState ? 0 : 1));
    dispatch(
      socketActions.emitter(userActions.CHANGE_STATE, {
        state: userState ? 0 : 1
      })
    );
  };

  return (
    <button onClick={readyHandler}>{userState ? `Not ready` : `Ready`}</button>
  );
};

export default ReadyButton;
