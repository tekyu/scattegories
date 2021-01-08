import produce from "immer";
import {
  UPDATE_ANSWERS,
  RESET_ANSWERS,
  UPDATE_SCOREBOARD,
  UPDATE_ACTIVE_LETTER,
  UPDATE_QUESTIONABLE
} from "./gameActions";

export const initialState = {
  answers: {},
  scoreboard: {},
  activeLetter: ``,
  questionable: []
};

export const gameReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_ANSWERS:
        Object.entries(payload.answers).forEach((key, value) => {
          draft.answers[key] = value;
        });
        return draft;
      case UPDATE_ACTIVE_LETTER:
        draft.activeLetter = payload;
        return draft;
      case RESET_ANSWERS:
        draft.answers = {};
        return draft;
      case UPDATE_SCOREBOARD:
        draft.scoreboard = { ...draft.scoreboard, ...payload.scores };
        return draft;
      case UPDATE_QUESTIONABLE:
        draft.questionable = payload;
        return draft;
      default:
        return draft;
    }
  }
);
