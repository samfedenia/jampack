import clearToken from '../../utils/clearToken';

// action type
const LOGOUT_USER = 'LOGOUT_USER';
// action creator
const _logoutUser = () => ({
  type: LOGOUT_USER,
});

// thunk
const logoutUser = () => async (dispatch) => {
  try {
    clearToken();
    dispatch(_logoutUser());
  } catch (err) {
    console.log(err);
  }
};

export { logoutUser, LOGOUT_USER };
