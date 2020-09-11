import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { roomSelectors, userSelectors } from "../../store/selectors";
import { roomActions, socketActions } from "../../store/actions";
import PlayersList from "../../components/PlayersList/PlayersList";
import ReadyButton from "../../components/ReadyButton/ReadyButton";
import RoomInfo from "../../components/RoomInfo/RoomInfo";

const WaitingScreen = () => {
  const dispatch = useDispatch();
  const admin = useSelector(roomSelectors.admin);
  const userId = useSelector(userSelectors.id);

  useEffect(() => {
    dispatch(
      socketActions.listener(`UPDATE_PLAYERS`, roomActions.updatePlayers)
    );

    return () => {
      dispatch(
        socketActions.removeListener(
          `UPDATE_PLAYERS`,
          roomActions.updatePlayers
        )
      );
    };
  }, [dispatch]);

  return (
    <div>
      <RoomInfo />
      <PlayersList />
      {admin === userId ? <div>test</div> : <ReadyButton />}
    </div>
  );
};

export default WaitingScreen;
