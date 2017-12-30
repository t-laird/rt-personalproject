const GroupTransactions = (store = [], action) => {
  switch(action.type) {
  case 'UPDATE_GROUP_TRANSACTIONS':
    return action.groupTransactions;
  default: 
    return store;
  }
}

export default GroupTransactions;