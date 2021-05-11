// action type
const SET_ITEM = 'SET_ITEM';
// action creator
const setItem = (item) => ({
  type: SET_ITEM,
  item,
});

export { setItem, SET_ITEM };
