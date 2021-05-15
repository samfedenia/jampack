import axios from 'axios';
import getToken from '../../utils/getToken';
import clearToken from '../../utils/clearToken';
import { setError } from '../error/setError';
import { clearError } from '../error/clearError';

// action type
const GET_USER = 'GET_USER';
// action creator
const _getUser = (user) => ({
  type: GET_USER,
  user,
});

// thunk
const getUser = () => async (dispatch) => {
  try {
    dispatch(clearError());
    const authenticatedUser = await axios.get('/api/login/auth', getToken());
    if (authenticatedUser.data) dispatch(_getUser(authenticatedUser.data));
  } catch (err) {
    // console.log(err.message);
    const errorMessage = err.message;
    dispatch(setError(errorMessage));
    clearToken();
    dispatch(clearError());
  }
};

export { getUser, GET_USER };
