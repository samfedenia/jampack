import { GET_ITEMS } from '../actions/items/getItems';

const itemsReducer = (state = [], action) => {
  if (action.type === GET_ITEMS) {
    console.log(action.items);
    return [...state, ...action.items];
  }
  return state;
};

export default itemsReducer;
