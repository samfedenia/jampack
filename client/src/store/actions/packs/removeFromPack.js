import axios from 'axios';
import getToken from '../../utils/getToken';

// action type
const REMOVE_ITEM_FROM_PACK = 'REMOVE_ITEM_FROM_PACK';
// action creator
const _removeItemFromPack = (packs) => ({
  type: REMOVE_ITEM_FROM_PACK,
  packs,
});

// thunk
const removeItemFromPack = (itemId) => async (dispatch) => {
  try {
    await axios.put(
      `/api/user/items/${itemId}/addToPack`,
      { parentItemId: null },
      getToken()
    );
    const packs = (await axios.get('/api/user/items/packs', getToken())).data;
    dispatch(_removeItemFromPack(packs));
  } catch (err) {
    console.log(err.message);
  }
};

export { removeItemFromPack, REMOVE_ITEM_FROM_PACK };
