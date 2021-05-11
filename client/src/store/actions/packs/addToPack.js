import axios from 'axios';
import getToken from '../../utils/getToken';

// action type
const ADD_ITEM_TO_PACK = 'ADD_ITEM_TO_PACK';
// action creator
const _addItemToPack = (packs) => ({
  type: ADD_ITEM_TO_PACK,
  packs,
});

// thunk
const addItemToPack = (item, parentItem) => async (dispatch) => {
  try {
    await axios.put(
      `/api/user/items/${item}/addToPack`,
      { parentItemId: parentItem },
      getToken()
    );
    const packs = (await axios.get('/api/user/items/packs', getToken())).data;
    dispatch(_addItemToPack(packs));
  } catch (err) {
    console.log(err.message);
  }
};

export { addItemToPack, ADD_ITEM_TO_PACK };
