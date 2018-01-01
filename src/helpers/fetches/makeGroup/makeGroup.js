import getKeyFromLS from '../../getKeyFromLS';

const makeGroup = async (groupName, weeklyPoints, password) => {

	const response = await fetch('http://localhost:3000/api/v1/group/new', {
		method: 'POST',
		body: JSON.stringify({
			group_name: groupName,
			group_passphrase: password,
			weekly_points: weeklyPoints
		}),
		headers: {
			'Content-Type': 'application/json',
      'x-token': getKeyFromLS()
		}
	})

	const groupResponse = await response.json();

	return groupResponse;
}

export default makeGroup;