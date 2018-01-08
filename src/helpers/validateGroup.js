import getKeyFromLS from './getKeyFromLS';

const validateGroup = async (passphrase, userid) => {
  const response = await fetch(
    `https://snapninja.herokuapp.com/api/v1/group/validate/${passphrase}/${userid}`, {
      headers: {
        'x-token': getKeyFromLS()
      }
    });
  const cleanResponse = await response.json();
  return cleanResponse;
};

export default validateGroup;