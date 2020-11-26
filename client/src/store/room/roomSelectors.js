import { createSelector } from "reselect";
import { initialState } from "./roomReducer";

export const roomSelector = state => state.room;

export const room = createSelector(
  roomSelector,
  room => room
);

export const playerMax = createSelector(
  roomSelector,
  ({ playerMax = initialState.playerMax }) => playerMax
);

export const maxScore = createSelector(
  roomSelector,
  ({ maxScore = initialState.maxScore }) => maxScore
);

export const id = createSelector(
  roomSelector,
  ({ id = initialState.id }) => id
);

export const owner = createSelector(
  roomSelector,
  ({ owner = initialState.owner }) => owner
);

export const admin = createSelector(
  roomSelector,
  ({ admin = initialState.admin }) => admin
);

export const state = createSelector(
  roomSelector,
  ({ state = initialState.state }) => state
);

export const stage = createSelector(
  roomSelector,
  ({ stage = initialState.stage }) => stage
);

export const players = createSelector(
  roomSelector,
  ({ players = initialState.players }) => players
);

export const winners = createSelector(
  roomSelector,
  ({ winners = initialState.winners }) => winners
);

export const categories = createSelector(
  roomSelector,
  ({ categories = initialState.categories }) => categories
);
