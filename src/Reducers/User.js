const User = (state = {}, action) => {
  switch(action.type) {
    case "UPDATE_USER":
      return action.user

    case "LOGOUT_USER":
    	return state = {}

    default:
      return state;
  }
}

export default User;