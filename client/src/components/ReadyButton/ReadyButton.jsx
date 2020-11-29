import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors } from "store/selectors";
import { roomActions } from "store/actions";
import theme from "assets/themes";
import { useTranslation } from "react-i18next";
import * as Styled from "./ReadyButton.styled";

const ReadyButton = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userState = useSelector(userSelectors.state);
  const [ready, setReady] = useState(userState || 0);
  const readyHandler = () => {
    dispatch(roomActions.changeUserState());
    setReady(ready ? 0 : 1);
  };

  console.log(`READYBUTTON --- state -> ${userState} | ready -> ${ready}`);

  return (
    <Styled.ReadyButton onClick={readyHandler}>
      <Styled.Unready ready={ready === 1}>
        {t(`waitingRoom.unreadyButton`)}
      </Styled.Unready>
      <Styled.Divider>/</Styled.Divider>
      <Styled.Ready ready={ready === 1}>
        {t(`waitingRoom.readyButton`)}
      </Styled.Ready>
    </Styled.ReadyButton>
  );
};

export default ReadyButton;
