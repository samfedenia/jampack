// action type
const SET_ERROR = 'SET_ERROR';
// action creator
const setError = (error) => ({
  type: SET_ERROR,
  error,
});

// thunk

export { setError, SET_ERROR };
