import React from "react";
import { useSelector } from "react-redux";
import { roomSelectors, userSelectors } from "../../store/selectors";
import Player from "../Player/Player";
import * as Styled from "./PlayersList.styled";

const PlayersList = () => {
  const players = useSelector(roomSelectors.players);
  const id = useSelector(userSelectors.id);
  const playerList = players.map(player => {
    const isYou = player.id === id;
    return <Player key={player.id} {...player} isYou={isYou} />;
  });
  return <Styled.Container>{playerList}</Styled.Container>;
};

export default PlayersList;
