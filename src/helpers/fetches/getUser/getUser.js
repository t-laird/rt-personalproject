import getKeyFromLS from '../../getKeyFromLS';

const getUser = async () => {
  const user = await fetch('https://snapninja.herokuapp.com/api/v1/users/', {
    method: 'GET',
    headers: {
      "x-token": getKeyFromLS(),
      "CONTENT-TYPE": 'application/json'
    }
  });
  const userData = await user.json();

  return userData[0];
};

export default getUser;
