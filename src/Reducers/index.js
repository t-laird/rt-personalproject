import { combineReducers } from 'redux';
import User from './User';
import Group from './Group';
import UserList from './UserList';
import UserTransactions from './UserTransactions';

const rootReducer = combineReducers({
  UserTransactions,
  UserList,
  User,
  Group
});

export default rootReducer;