import { ADD_ITEM_TO_PACK } from '../actions/packs/addToPack';
import { REMOVE_ITEM_FROM_PACK } from '../actions/packs/removeFromPack';
import { GET_PACKS } from '../actions/packs/getPacks';

//this reducer is mutating state (fix if time)
const packsReducer = (state = [], action) => {
  if (action.type === ADD_ITEM_TO_PACK) {
    return action.packs;
  }
  if (action.type === REMOVE_ITEM_FROM_PACK) {
    return action.packs;
  }
  if (action.type === GET_PACKS) {
    return action.packs;
  }
  return state;
};

export default packsReducer;
