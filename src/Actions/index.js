export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

export const updateGroup = (group) => {
  return {
    type: 'UPDATE_GROUP',
    group
  };
};

export const updateUserTransactions = (transactions) => {
  return {
    type: 'UPDATE_TRANSACTIONS',
    transactions
  };
};

export const updateGroupTransactions = (groupTransactions) => {
  return {
    type: 'UPDATE_GROUP_TRANSACTIONS',
    groupTransactions
  };
};

export const updateUserList = (users) => {
  return {
    type: 'UPDATE_USERS',
    users
  };
};