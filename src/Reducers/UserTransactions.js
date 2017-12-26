const UserTransactions = (store = [], action) => {
  switch(action.type) {
  case 'UPDATE_TRANSACTIONS':
    return action.transactions;
  default: 
    return store;
  }
}

export default UserTransactions;