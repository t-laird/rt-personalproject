import getKeyFromLS from '../../getKeyFromLS';

const validateSlackId = async (userId) => {

  const validateSlackResponse = await fetch('http://e1d037ce.ngrok.io/api/v1/slack', {
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