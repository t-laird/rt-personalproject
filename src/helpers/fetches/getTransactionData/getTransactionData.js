import getKeyFromLS from '../../getKeyFromLS';

const getTransactionData = async (userData) => {
  userData.created_date = "2017-11-18T18:34:30.017Z";  /// PULL THIS LINE OUT FOR PRODUCTION
  const userTransactionData = await fetch('http://localhost:3000/api/v1/events/getuserdata/', {
	  method: 'POST',
	  headers: {
	    "x-token": getKeyFromLS(),
	    "CONTENT-TYPE": 'application/json'
	  },
	  body: JSON.stringify({user: userData})
  });
  const userTransactions = await userTransactionData.json();
  
  return userTransactions;
};

export default getTransactionData;