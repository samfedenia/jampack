import axios from 'axios';
import getToken from '../../utils/getToken';
import { getPacks } from '../packs/getPacks';
// action type
const CREATE_ITEM = 'CREATE_ITEM';
// action creator
const _createItem = (item) => ({
  type: CREATE_ITEM,
  item,
});

// thunk
const createItem = (item) => async (dispatch) => {
  try {
    const newItem = (await axios.post(`/api/user/items/`, item, getToken()))
      .data;

    dispatch(_createItem(newItem));
    // console.log(newItem.category);
    if (newItem.category === 'Pack') dispatch(getPacks());
  } catch (err) {
    console.log(err.message);
  }
};

export { createItem, CREATE_ITEM };
