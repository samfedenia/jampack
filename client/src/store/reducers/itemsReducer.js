import { GET_ITEMS } from '../actions/items/getItems';
import { DELETE_ITEM } from '../actions/items/deleteItem';
import { LOGOUT_USER } from '../actions/user/logout';
import { CREATE_ITEM } from '../actions/items/createItem';

const itemsReducer = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    return [...state, ...action.items];
  }
  if (action.type === DELETE_ITEM) {
    return [...state.filter((item) => item.id !== action.item.id)];
  }
  if (action.type === CREATE_ITEM) {
    return [...state, action.item];
  }
  if (action.type === LOGOUT_USER) {
    return [];
  }
  return state;
};

export default itemsReducer;
