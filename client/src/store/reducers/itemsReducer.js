import { GET_ITEMS } from '../actions/items/getItems';
import { LOGOUT_USER } from '../actions/user/logout';

const itemsReducer = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    console.log(action.items);
    return [...state, ...action.items];
  }
  if (action.type === LOGOUT_USER) {
    console.log(action.items);
    return [];
  }
  return state;
};

export default itemsReducer;
