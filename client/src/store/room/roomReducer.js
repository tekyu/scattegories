import produce from "immer";
import {
  UPDATE_PLAYERS,
  UPDATE_ROOM,
  UPDATE_OWNER,
  UPDATE_ADMIN,
  UPDATE_STATE,
  UPDATE_WINNERS,
  LEAVE_ROOM,
  UPDATE_SCOREBOARD,
  UPDATE_ACTIVE_LETTER
} from "./roomActions";

export const initialState = {
  playersMax: 10,
  maxScore: 100,
  id: ``,
  owner: ``,
  admin: ``,
  state: 0, // 0 - waiting | 1 - ready | 2 - started | 3 - paused | 4 - ended,
  stage: 0, // 0 - idle | 1 - choosing | 2 - writing | 3 - waiting | 4 - checking | 5 - summary | 6 - ended
  players: [],
  scoreboard: {},
  winners: [],
  categories: [],
  roundNumber: 0,
  activeLetter: ``,
  nextRoundTimeout: 0
};

export const roomReducer = produce(
  (draft = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_ROOM:
        console.log(`updateroom reducer`, payload);
        Object.entries(payload).forEach(([key, value]) => {
          draft[key] = value;
        });
        // Object.assign({}, draft, payload);
        return draft;
      case UPDATE_SCOREBOARD:
        console.log(`[roomReducer] [UPDATE_SCOREBOARD]`, payload);
        draft.scoreboard = payload;
        return draft;
      case UPDATE_PLAYERS:
        draft.players = payload;
        return draft;
      case UPDATE_OWNER:
        draft.owner = payload;
        return draft;
      case UPDATE_ADMIN:
        draft.admin = payload;
        return draft;
      case UPDATE_STATE:
        draft.state = payload;
        return draft;
      case UPDATE_WINNERS:
        draft.winners = payload;
        return draft;
      case UPDATE_ACTIVE_LETTER:
        draft.activeLetter = payload;
        return draft;
      case LEAVE_ROOM:
        return initialState;
      default:
        return draft;
    }
  }
);
