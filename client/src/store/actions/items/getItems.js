import axios from 'axios';
import getToken from '../../utils/getToken';
import clearToken from '../../utils/clearToken';
import { setError } from '../error/setError';
import { clearError } from '../error/clearError';

// action type
const GET_ITEMS = 'GET_ITEMS';
// action creator
const _getItems = (items) => ({
  type: GET_ITEMS,
  items,
});

// thunk
const getItems = () => async (dispatch) => {
  try {
    dispatch(clearError());
    const items = await axios.get('/api/user/items', getToken());
    console.log(items.data);
    if (items.data.items) dispatch(_getItems(items.data.items));
  } catch (err) {
    console.log(err.message);
  }
};

export { getItems, GET_ITEMS };
