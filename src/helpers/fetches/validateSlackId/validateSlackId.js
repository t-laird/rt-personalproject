import getKeyFromLS from '../../getKeyFromLS';

const validateSlackId = async (userId) => {

  const validateSlackResponse = await fetch('http://localhost:3000/api/v1/slack', {
    method: 'POST',
    headers: {
      "x-token": getKeyFromLS(),
      'CONTENT-TYPE': 'application/json'
    },
    body: JSON.stringify({
      id: userId
    })
  });

  const validateSlack = await validateSlackResponse.json();
  return validateSlack;
};

export default validateSlackId;
