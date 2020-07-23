import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors, roomSelectors } from "../../store/selectors";
import { userActions } from "../../store/actions";

const StartGameButton = () => {
  const dispatch = useDispatch();
  const playerd = useSelector(roomSelectors.players);

  // const IsEveryoneReady = 
  // const readyHandler = () => {
  //   dispatch(userActions.changeState({ state: userState ? 0 : 1 }));
  // };

  return (
    <button onClick={readyHandler}>{userState ? `Not ready` : `Ready`}</button>
  );
};

export default StartGameButton;
