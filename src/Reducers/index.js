import { combineReducers } from 'redux';
import User from './User';
import Group from './Group';

const rootReducer = combineReducers({
  User,
  Group
});

export default rootReducer;