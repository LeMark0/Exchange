import { combineReducers } from 'redux';

import exchange from './exchange';
import user from './user';

export default combineReducers({
  exchange,
  user,
});
