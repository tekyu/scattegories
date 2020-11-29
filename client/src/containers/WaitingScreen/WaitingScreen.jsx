import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Countdown from "components/Countdown/Countdown";
import { roomSelectors, userSelectors } from "store/selectors";
import { roomActions, socketActions } from "store/actions";
import PlayersList from "components/PlayersList/PlayersList";
import ReadyButton from "components/ReadyButton/ReadyButton";
import RoomInfo from "components/RoomInfo/RoomInfo";
import InputRow from "components/InputRow/InputRow";
import { useTranslation } from "react-i18next";
import PostItNoteDynamic from "components/PostItNoteDynamic/PostItNoteDynamic";
import * as Styled from "./WaitingScreen.styled";

const WaitingScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const admin = useSelector(roomSelectors.admin);
  const userId = useSelector(userSelectors.id);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    dispatch(
      socketActions.listener(`UPDATE_PLAYERS`, roomActions.updatePlayers)
    );
    dispatch(
      socketActions.listener(`STARTING_GAME`, ({ data: { time } }) => {
        setTimer(
          time > 0 ? (
            <Countdown
              time={time}
              fontSize="2em"
              text={t(`waitingRoom.countdownText`)}
            />
          ) : null
        );
      })
    );

    return () => {
      dispatch(
        socketActions.removeListener(
          `UPDATE_PLAYERS`,
          roomActions.updatePlayers
        )
      );
    };
  }, [dispatch, t]);

  return (
    <Styled.WaitingScreen>
      <RoomInfo />
      {timer && (
        <Styled.CountdownContainer>
          <PostItNoteDynamic
            rotate={(Math.random() * (-1 - 2.5) + 2.5).toFixed(2)}
          >
            <Styled.CountdownText>
              {t(`waitingRoom.startingInCountdownText`)}
            </Styled.CountdownText>
            {timer}
          </PostItNoteDynamic>
        </Styled.CountdownContainer>
      )}
      <ReadyButton />
      <PlayersList />
    </Styled.WaitingScreen>
  );
};

export default WaitingScreen;
