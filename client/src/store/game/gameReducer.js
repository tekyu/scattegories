import produce from "immer";
import {
  UPDATE_ANSWERS,
  RESET_ANSWERS,
  UPDATE_SCOREBOARD
} from "./gameActions";

export const initialState = {
  answers: {},
  scoreboard: {}
};

export const gameReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_ANSWERS:
        Object.entries(payload.answers).forEach((key, value) => {
          draft.answers[key] = value;
        });
        return draft;
      case RESET_ANSWERS:
        draft.answers = {};
        return draft;
      case UPDATE_SCOREBOARD:
        draft.scoreboard = { ...draft.scoreboard, ...payload.scores };
        return draft;
      default:
        return draft;
    }
  }
);
