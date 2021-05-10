import axios from 'axios';
import getToken from '../../utils/getToken';
import { setError } from '../error/setError';
import { clearError } from '../error/clearError';

// action type
const LOGIN_USER = 'LOGIN_USER';
// action creator
const _loginUser = (user) => ({
  type: LOGIN_USER,
  user,
});

// thunk
const loginUser = (user) => async (dispatch) => {
  try {
    let response = await axios.post('/api/login/auth', user);
    const { token } = response.data;
    dispatch(clearError());
    window.localStorage.setItem('token', token);
    const authenticatedUser = await axios.get('/api/login/auth', getToken());
    dispatch(_loginUser(authenticatedUser.data));
  } catch (err) {
    console.log(err.response.data);
    const { errorMessage } = err.response.data;
    dispatch(setError(errorMessage));
  }
};

export { loginUser, LOGIN_USER };
