export const UPDATE_PLAYER = `UPDATE_PLAYER`;
export const CHANGE_USERNAME = `CHANGE_USERNAME`;
export const ADD_ACTIVE_ROOM = `ADD_ACTIVE_ROOM`;
export const REMOVE_ACTIVE_ROOM = `REMOVE_ACTIVE_ROOM`;
export const CHANGE_STATE = `CHANGE_STATE`;
export const RESET_USER = `RESET_USER`;

export const updatePlayer = user => ({
  type: UPDATE_PLAYER,
  payload: user
});

export const changeUsername = username => ({
  type: CHANGE_USERNAME,
  payload: { username }
});

export const addActiveRoom = roomId => ({
  type: ADD_ACTIVE_ROOM,
  payload: { roomId }
});

export const removeActiveRoom = roomId => ({
  type: REMOVE_ACTIVE_ROOM,
  payload: { roomId }
});

export const changeRoomState = state => ({
  type: CHANGE_STATE,
  payload: { state }
});

export const resetUser = () => ({
  type: RESET_USER
});
