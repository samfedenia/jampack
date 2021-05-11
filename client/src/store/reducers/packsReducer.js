import { ADD_ITEM_TO_PACK } from '../actions/packs/addToPack';

const packsReducer = (state = [], action) => {
  if (action.type === ADD_ITEM_TO_PACK) {
    console.log(action.packs);
    return action.packs;
  }
  return state;
};

export default packsReducer;
