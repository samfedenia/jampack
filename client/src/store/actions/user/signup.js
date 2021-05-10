import axios from 'axios';
import getToken from '../../utils/getToken';
import { setError } from '../error/setError';
import { clearError } from '../error/clearError';

// action type
const CREATE_USER = 'CREATE_USER';
// action creator
const _createUser = (user) => ({
  type: CREATE_USER,
  user,
});

// thunk
const createUser = (user) => async (dispatch) => {
  try {
    let response = await axios.post('/api/signup', user);
    response = await axios.post('/api/login/auth', user);
    dispatch(clearError());
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    const authenticatedUser = await axios.get('/api/login/auth', getToken());
    dispatch(_createUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response.data);
    const { errorMessage } = err.response.data;
    dispatch(setError(errorMessage));
  }
};

export { createUser, CREATE_USER };
