const UserList = (store = [], action) => {
  switch (action.type) {
  case 'UPDATE_USERS':
    return action.users;
  default: 
    return store;
  }
};

export default UserList;