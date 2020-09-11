import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "../../store/selectors";
import { userActions, socketActions } from "../../store/actions";

const ReadyButton = () => {
  const dispatch = useDispatch();
  const userState = useSelector(userSelectors.state);
  const [ready, setReady] = useState(userState || 0);
  const readyHandler = () => {
    setReady(ready ? 0 : 1);
  };

  console.log(`READYBUTTON --- state -> ${userState} | ready -> ${ready}`);

  useEffect(() => {
    console.log(
      `READYBUTTON | USEEFFECT --- state -> ${userState} | ready -> ${ready}`
    );
    dispatch(userActions.changeState(ready));
    dispatch(
      socketActions.emitter(userActions.CHANGE_STATE, {
        ready
      })
    );
  }, [dispatch, ready]);

  return (
    <button onClick={readyHandler}>{ready ? `Not ready` : `Ready`}</button>
  );
};

export default ReadyButton;
