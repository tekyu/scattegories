import { emitter } from "../socket/socketActions";

export const UPDATE_ANSWERS = `UPDATE_ANSWERS`;
export const RESET_ANSWERS = `RESET_ANSWERS`;
export const UPDATE_SCOREBOARD = `UPDATE_SCOREBOARD`;
export const GAME_READY_STATUS = `GAME_READY_STATUS`;
export const UPDATE_ACTIVE_LETTER = `UPDATE_ACTIVE_LETTER`;
export const SEND_ANSWERS = `SEND_ANSWERS`;
export const UPDATE_QUESTIONABLE = `UPDATE_QUESTIONABLE`;
export const QUESTIONABLE_ANSWERS_SENT = `QUESTIONABLE_ANSWERS_SENT`;
export const LEAVE_ROOM = `LEAVE_ROOM`;

export const readyForGame = () => {
  return dispatch => {
    dispatch(emitter(GAME_READY_STATUS));
  };
};

export const updateActiveLetter = letter => ({
  type: UPDATE_ACTIVE_LETTER,
  payload: letter
});

export const updateAnswers = answers => ({
  type: UPDATE_ANSWERS,
  payload: answers
});

export const resetAnswers = () => ({
  type: RESET_ANSWERS
});

export const updateScoreboard = scoreboard => {
  console.log(`[gameActions][updateScoreboard]`, scoreboard);
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SCOREBOARD,
      payload: { scoreboard, id: getState().user.id }
    });
  };
};

export const updateQuestionableAnswers = scores => ({
  type: UPDATE_QUESTIONABLE,
  payload: scores
});

export const sendAnswers = answers => {
  return dispatch => {
    console.log(`sendansers dispatch`, answers);
    dispatch(emitter(SEND_ANSWERS, { answers }));
  };
};

export const sendQuestionableAnswers = answers => {
  return dispatch => {
    console.log(`sendQuestionableAnswers dispatch`, answers);
    dispatch(emitter(QUESTIONABLE_ANSWERS_SENT, { answers }));
  };
};

export const leaveRoom = () => {
  return dispatch => {
    dispatch({ type: LEAVE_ROOM });
  };
};
