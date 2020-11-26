import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TraversingLetter from "components/TraversingLetter/TraversingLetter";
import Results from "components/Results/Results";
import { stage } from "store/room/roomSelectors";
import InputRow from "components/InputRow/InputRow";
import { socketActions } from "store/actions";
import Countdown from "components/Countdown/Countdown";
import { readyForGame } from "../../store/game/gameActions";
import * as Styled from "./Game.styled";

const Game = () => {
  const dispatch = useDispatch();
  const roomStage = useSelector(stage);
  const [waitingTimer, setWaitingTimer] = useState(0);
  const setWaitingTimeHandler = ({ data: { time } }) => {
    setWaitingTimer(time);
  };

  useEffect(() => {
    dispatch(socketActions.listener(`WAITING_TIME`, setWaitingTimeHandler));

    return () => {
      dispatch(
        socketActions.removeListener(`WAITING_TIME`, setWaitingTimeHandler)
      );
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(readyForGame());
  }, [dispatch]);
  return (
    <Styled.Game>
      {waitingTimer > 0 && <Countdown time={waitingTimer} />}
      <TraversingLetter />
      <Results />
      {roomStage === 2 && <InputRow />}
    </Styled.Game>
  );
};

export default Game;
