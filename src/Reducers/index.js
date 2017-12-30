import { combineReducers } from 'redux';
import User from './User';
import Group from './Group';
import UserList from './UserList';
import UserTransactions from './UserTransactions';
import GroupTransactions from './GroupTransactions';

const rootReducer = combineReducers({
  UserTransactions,
  UserList,
  User,
  Group,
  GroupTransactions
});

export default rootReducer;