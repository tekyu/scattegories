import { createSelector } from "reselect";
import { initialState } from "./userReducer";

const userSelector = state => state.user;

export const user = createSelector(
  userSelector,
  user => user
);

export const username = createSelector(
  userSelector,
  ({ username = initialState.username }) => username
);

export const activeRooms = createSelector(
  userSelector,
  ({ activeRooms = initialState.activeRooms }) => activeRooms
);

export const id = createSelector(
  userSelector,
  ({ id = initialState.id }) => id
);

export const state = createSelector(
  userSelector,
  ({ state = initialState.state }) => state
);
