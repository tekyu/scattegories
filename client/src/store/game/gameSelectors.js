import { createSelector } from "reselect";
import { initialState } from "./gameReducer";

const gameSelector = state => state.game;

export const answers = createSelector(
  gameSelector,
  ({ answers = initialState.answers }) => answers
);

export const activeLetter = createSelector(
  gameSelector,
  ({ activeLetter = initialState.activeLetter }) => activeLetter
);

export const scoreboard = createSelector(
  gameSelector,
  ({ scoreboard = initialState.scoreboard }) => scoreboard
);

export const questionable = createSelector(
  gameSelector,
  ({ questionable = initialState.questionable }) => questionable
);
