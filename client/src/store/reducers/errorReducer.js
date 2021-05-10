import { SET_ERROR } from '../actions/error/setError';
import { CLEAR_ERROR } from '../actions/error/clearError';

const errorReducer = (state = '', action) => {
  if (action.type === SET_ERROR) {
    return action.error;
  }
  if (action.type === CLEAR_ERROR) {
    return '';
  }
  return state;
};

export default errorReducer;
