const UPDATE_ANSWER = 'Questionnaire/Score/UPDATE_ANSWER';
const UPDATE_SCORE = 'Questionnaire/Score/UPDATE_SCORE';

/* Actions */
export const updateScore = (prev, current) => {
  return {
    type: UPDATE_SCORE,
    payload: parseInt(current) - parseInt(prev)
  }
};

/* Reducers */
export default (state = { totalScore: 0 }, action = {}) => {
  switch (action.type) {
    case UPDATE_SCORE:
      return Object.assign({}, state, {
      totalScore: state.totalScore + action.payload
    });
    default:
      return state;
  };
};