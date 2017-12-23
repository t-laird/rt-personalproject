import getKeyFromLS from './getKeyFromLS';

const validateGroup = async (passphrase, userid) => {
	const response = await fetch(`http://localhost:3000/api/v1/group/validate/${passphrase}/${userid}`, {
		headers: {
			'x-token': getKeyFromLS(),
		}
	})
	const cleanResponse = await response.json();
	return cleanResponse;
}

export default validateGroup;