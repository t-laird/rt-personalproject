import getKeyFromLS from '../../getKeyFromLS';

const getUsersInGroup = async (userData) => {

  const usersInGroupResponse = await fetch(`https://snapninja.herokuapp.com/api/v1/users/group/${userData.group_id}`, {
	  method: 'GET',
	  headers: {
	    "x-token": getKeyFromLS(),
	    'CONTENT-TYPE': 'application/json'
	  }
  });
  const usersInGroup = await usersInGroupResponse.json();
	
  return usersInGroup;
};

export default getUsersInGroup;