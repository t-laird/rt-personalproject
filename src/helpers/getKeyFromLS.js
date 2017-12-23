const getKeyFromLS = () => {
	const userKey = JSON.parse(localStorage.getItem('123rtx-token'));
	return userKey
}

export default getKeyFromLS;