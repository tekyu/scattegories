import produce from "immer";
import {
  ADD_ACTIVE_ROOM,
  REMOVE_ACTIVE_ROOM,
  CHANGE_USERNAME,
  UPDATE_PLAYER,
  CHANGE_STATE,
  RESET_USER
} from "./userActions";

export const initialState = {
  username: "",
  id: "",
  activeRooms: [],
  state: 0
};

export const userReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_PLAYER:
        Object.assign(draft, payload);
        return draft;
      case CHANGE_USERNAME:
        draft.username = payload.username;
        return draft;
      case ADD_ACTIVE_ROOM:
        draft.activeRooms.push(payload.id);
        return draft;
      case REMOVE_ACTIVE_ROOM:
        draft.rooms = draft.rooms.filter(id => id !== payload.id);
        return draft;
      case CHANGE_STATE:
        draft.state = payload;
        return draft;
      case RESET_USER:
        return initialState;
      default:
        return draft;
    }
  }
);
