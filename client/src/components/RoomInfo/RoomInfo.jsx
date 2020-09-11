import React from "react";
import { useSelector } from "react-redux";
import { roomSelectors } from "../../store/selectors";

const RoomInfo = () => {
  const {
    playersMax,
    players,
    id,
    maxScore,
    owner,
    admin,
    state,
    categories,
    createdAt
  } = useSelector(roomSelectors.room);
  return (
    <div>
      <p>Players max: {playersMax}</p>
      <p>Players: {players.length}</p>
      <p>Room id: {id}</p>
      <p>Max score: {maxScore}</p>
      <p>Owner: {owner}</p>
      <p>Admin: {admin}</p>
      <p>State: {state}</p>
      <p>Categories: {JSON.stringify(categories)}</p>
      <p>Created at: {createdAt}</p>
    </div>
  );
};

export default RoomInfo;
