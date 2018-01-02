const Group = (state = {}, action) => {
  switch (action.type) {
  case "UPDATE_GROUP":
    return action.group;

  default:
    return state;
  }
};

export default Group;