import getKeyFromLS from '../../getKeyFromLS';

const getGroupSettings = async (userData) => {
  const groupDataResponse = await fetch(`https://snapninja.herokuapp.com/api/v1/group/${userData.group_id}`, {
	  method: 'GET',
	  headers: {
	    'CONTENT-TYPE': 'application/json',
	    'x-token': getKeyFromLS()
	  }
  });
  const groupData = await groupDataResponse.json();

  return groupData[0];
};

export default getGroupSettings;