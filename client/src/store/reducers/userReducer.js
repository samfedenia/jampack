import { CREATE_USER } from '../actions/user/signup';
import { LOGIN_USER } from '../actions/user/login';
import { LOGOUT_USER } from '../actions/user/logout';
import { UPDATE_USER } from '../actions/user/updateUser';
import { DELETE_USER } from '../actions/user/deleteUser';

const userReducer = (state = {}, action) => {
  if (action.type === CREATE_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === LOGIN_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === LOGOUT_USER) {
    return {};
  }
  if (action.type === UPDATE_USER) {
    return { ...state, ...action.user };
  }
  if (action.type === DELETE_USER) {
    return {};
  }
  return state;
};

export default userReducer;
