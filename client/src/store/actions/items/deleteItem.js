import axios from 'axios';
import getToken from '../../utils/getToken';

// action type
const DELETE_ITEM = 'DELETE_ITEM';
// action creator
const _deleteItem = (item) => ({
  type: DELETE_ITEM,
  item,
});

// thunk
const deleteItem = (item) => async (dispatch) => {
  try {
    await axios.delete(`/api/user/items/${item.id}`, getToken());
    dispatch(_deleteItem(item));
  } catch (err) {
    console.log(err.message);
  }
};

export { deleteItem, DELETE_ITEM };
