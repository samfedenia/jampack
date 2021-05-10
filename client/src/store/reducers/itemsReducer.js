import { GET_ITEMS } from '../actions/items/getItems';

const itemReducer = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    return { ...state, ...action.item };
  }
  return state;
};

export default itemReducer;
