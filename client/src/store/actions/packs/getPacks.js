import axios from 'axios';
import getToken from '../../utils/getToken';

// action type
const GET_PACKS = 'GET_PACKS';
// action creator
const _getPacks = (packs) => ({
  type: GET_PACKS,
  packs,
});

// thunk
const getPacks = () => async (dispatch) => {
  try {
    const packs = (await axios.get('/api/user/items/packs', getToken())).data;
    dispatch(_getPacks(packs));
  } catch (err) {
    console.log(err.message);
  }
};

export { getPacks, GET_PACKS };
