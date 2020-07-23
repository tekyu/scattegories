export const UPDATE_ANSWERS = `UPDATE_ANSWERS`;
export const RESET_ANSWERS = `RESET_ANSWERS`;
export const UPDATE_SCOREBOARD = `UPDATE_SCOREBOARD`;

export const updateAnswers = answers => ({
  type: UPDATE_ANSWERS,
  payload: answers
});

export const resetAnswers = () => ({
  type: RESET_ANSWERS
});

export const updateScoreboard = scores => ({
  type: UPDATE_SCOREBOARD,
  payload: scores
});
