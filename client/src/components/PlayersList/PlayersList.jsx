import React from "react";
import { useSelector } from "react-redux";
import { roomSelectors } from "../../store/selectors";
import Player from "../Player/Player";
import * as Styled from "./PlayersList.styled";

const PlayersList = () => {
  const players = useSelector(roomSelectors.players);
  const playerList = players.map(player => {
    return <Player key={player.id} {...player} />;
  });
  return <Styled.Container>{playerList}</Styled.Container>;
};

export default PlayersList;
