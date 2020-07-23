import { createSelector } from "reselect";

const socketSelector = state => state.socket;

export const socketId = createSelector(
  socketSelector,
  ({ id = "" }) => id
);
