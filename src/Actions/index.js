export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    user
  }
}

export const logoutUser = () => {
	return {
		type: 'LOGOUT_USER',
	}
}

export const updateGroup = (group) => {
	return {
		type: 'UPDATE_GROUP',
		group
	}
}