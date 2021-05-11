import { combineReducers } from 'redux';
import userReducer from './userReducer';
import itemsReducer from './itemsReducer';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import packsReducer from './packsReducer';

export default combineReducers({
  user: userReducer,
  items: itemsReducer,
  item: itemReducer,
  packs: packsReducer,
  error: errorReducer,
});
