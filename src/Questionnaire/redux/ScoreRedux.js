const UPDATE_ANSWER = 'Questionnaire/Score/UPDATE_ANSWER';
const UPDATE_SCORE = 'Questionnaire/Score/UPDATE_SCORE';

/* Actions */
export const updateAnswer = (id, answer) => {
  let obj = {};
  obj[id] = answer;
  return {
    type:    UPDATE_ANSWER,
    payload: obj
  }
};

export const updateScore = (prev, current) => {
  return {
    type: UPDATE_SCORE,
    payload: parseInt(current) - parseInt(prev)
  }
};

/* Reducers */
export default (state = { totalScore: 0 }, action = {}) => {
  switch (action.type) {
    case UPDATE_ANSWER:
      return Object.assign({}, state, action.payload);
    case UPDATE_SCORE:
      return Object.assign({}, state, {
      totalScore: state.totalScore + action.payload
    });
    default:
      return state;
  };
};