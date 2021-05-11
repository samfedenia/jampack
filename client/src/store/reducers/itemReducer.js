import { CREATE_ITEM } from '../actions/items/createItem';
import { UPDATE_ITEM } from '../actions/items/updateItem';
import { DELETE_ITEM } from '../actions/items/deleteItem';
import { SET_ITEM } from '../actions/items/setItem';

const itemReducer = (state = {}, action) => {
  if (action.type === CREATE_ITEM) {
    return { ...state, ...action.item };
  }
  if (action.type === UPDATE_ITEM) {
    return { ...state, ...action.item };
  }
  if (action.type === SET_ITEM) {
    return { ...state, ...action.item };
  }
  if (action.type === DELETE_ITEM) {
    return {};
  }
  return state;
};

export default itemReducer;
