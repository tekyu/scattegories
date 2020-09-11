import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { userSelectors, roomSelectors } from "store/selectors";
import * as socketActions from "../../store/socket/socketActions";
import { roomActions } from "../../store/actions";
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
  const dispatch = useDispatch();
  const history = useHistory();
  const [component, setComponent] = useState(<FullScreenLoader />);
  // const [activeRoom, setActiveRoom] = useState(null);

  const updatePlayers = useCallback(
    ({ data }) => {
      dispatch(roomActions.updatePlayers(data));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(socketActions.listener(`UPDATE_PLAYERS`, updatePlayers));

    return () => {
      dispatch(socketActions.listener(`UPDATE_PLAYERS`, updatePlayers));
    };
  }, [dispatch, updatePlayers]);

  useEffect(() => {
    console.log("gamecontainer", room.id, user.id, room.state);
    if (room.state > 2) {
      setComponent(<Game />);
    } else if (room.id && user.id) {
      setComponent(<WaitingScreen />);
    } else {
      setComponent(<JoinGame roomId={id} />);
    }
  }, [id, room, setComponent, user]);

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
