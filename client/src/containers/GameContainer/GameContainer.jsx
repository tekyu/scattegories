import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { userSelectors, roomSelectors } from "store/selectors";
import {
  UPDATE_PLAYERS,
  UPDATE_ROOM,
  UPDATE_SCOREBOARD
} from "store/room/roomActions";
import * as socketActions from "../../store/socket/socketActions";
import { gameActions, roomActions } from "../../store/actions";
import JoinGame from "../JoinGame/JoinGame";
import WaitingScreen from "../WaitingScreen/WaitingScreen";
import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";
import Game from "../Game/Game";

const GameContainer = () => {
  const {
    params: { id }
  } = useRouteMatch();
  const user = useSelector(userSelectors.user);
  const room = useSelector(roomSelectors.room);
  const roomState = useSelector(roomSelectors.state);
  const dispatch = useDispatch();
  const [component, setComponent] = useState(<FullScreenLoader />);

  const updatePlayers = useCallback(
    ({ data }) => {
      dispatch(roomActions.updatePlayers(data));
    },
    [dispatch]
  );

  const updateRoom = useCallback(
    ({ data }) => {
      dispatch(roomActions.updateRoom(data));
    },
    [dispatch]
  );

  const updateScoreboardHandler = useCallback(
    ({ data }) => {
      console.log(`[gameContainer][updateScoreboard]`, data);
      dispatch(roomActions.updateScoreboard(data));
      // dispatch(gameActions.updateScoreboard(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(socketActions.listener(UPDATE_PLAYERS, updatePlayers));
    dispatch(socketActions.listener(UPDATE_ROOM, updateRoom));
    dispatch(
      socketActions.listener(`UPDATE_SCOREBOARD`, updateScoreboardHandler)
    );
    console.log(`[gameContainer][updateScoreboard][listener]`);
    return () => {
      dispatch(socketActions.removeListener(UPDATE_PLAYERS, updatePlayers));
      dispatch(socketActions.removeListener(UPDATE_ROOM, updateRoom));
      dispatch(
        socketActions.removeListener(
          `UPDATE_SCOREBOARD`,
          updateScoreboardHandler
        )
      );
      console.log(`[gameContainer][updateScoreboard][removeListener]`);
    };
  }, [dispatch, updatePlayers, updateRoom, updateScoreboardHandler]);

  useEffect(() => {
    console.log(`gamecontainer`, room.id, user.id, room.state);
    if (roomState >= 2) {
      setComponent(<Game />);
    } else if (room.id && user.id) {
      setComponent(<WaitingScreen />);
    } else {
      setComponent(<JoinGame roomId={id} />);
    }
  }, [id, room, roomState, setComponent, user]);

  useEffect(() => {
    const pingInterval = setInterval(() => {
      dispatch(socketActions.emitter(`PING_ROOM`));
    }, 330000);
    return () => {
      clearInterval(pingInterval);
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(roomActions.leaveRoom(id));
    };
  }, [dispatch, id]);

  return <div>{component}</div>;
};

export default GameContainer;
