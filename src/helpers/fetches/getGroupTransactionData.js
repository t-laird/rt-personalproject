import getKeyFromLS from '../getKeyFromLS';

const getGroupTransactionData = async (groupData) => {
	groupData.created_date = "2017-10-18T18:34:30.017Z";  /// PULL THIS LINE OUT FOR PRODUCTION
	const groupTransactionData = await fetch('http://localhost:3000/api/v1/events/getgroupdata/', {
	  method: 'POST',
	  headers: {
	    "x-token": getKeyFromLS(),
	    "CONTENT-TYPE": 'application/json'
	  },
	  body: JSON.stringify({group: groupData})
	});
  const groupTransactions = await groupTransactionData.json();

  return groupTransactions;
}

export default getGroupTransactionData;