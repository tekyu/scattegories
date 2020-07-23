import { emitter } from "store/socket/socketActions";
import { RESET_USER } from "../user/userActions";

export const UPDATE_ROOM = `UPDATE_ROOM`;
export const UPDATE_OWNER = `UPDATE_OWNER`;
export const UPDATE_ADMIN = `UPDATE_ADMIN`;
export const UPDATE_STATE = `UPDATE_STATE`;
export const UPDATE_PLAYERS = `UPDATE_PLAYERS`;
export const UPDATE_WINNERS = `UPDATE_WINNERS`;
export const LEAVE_ROOM = `LEAVE_ROOM`;

export const updateRoom = room => ({
  type: UPDATE_ROOM,
  payload: room
});

export const updateOwner = id => ({
  type: UPDATE_OWNER,
  payload: id
});

export const updateAdmin = id => ({
  type: UPDATE_ADMIN,
  payload: id
});

export const updateState = state => ({
  type: UPDATE_STATE,
  payload: state
});

export const updatePlayers = players => ({
  type: UPDATE_PLAYERS,
  payload: players
});

export const updateWinners = winners => ({
  type: UPDATE_WINNERS,
  payload: winners
});

export const leaveRoom = roomId => {
  return dispatch => {
    dispatch({ type: LEAVE_ROOM });
    dispatch({ type: RESET_USER });
    dispatch(emitter(LEAVE_ROOM, { roomId }));
  };
};
