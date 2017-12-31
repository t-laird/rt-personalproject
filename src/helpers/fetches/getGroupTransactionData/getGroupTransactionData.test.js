import getGroupTransactionData from './getGroupTransactionData';
import { mockGroupData } from '../../../mockData/mockGroupData';
import { getGroupTransactionDataApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
	getItem: () => null
};

describe('get group transaction data tests', () => {
	window.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
	    json: () => Promise.resolve(getGroupTransactionDataApiResponse)
		})
	);

	it('should be a function', () => {
    expect(getGroupTransactionData).toBeAFunction;
  });

  it('getGroupTransactionData is called with the correct params', async () => {
    const expected = [
      'http://localhost:3000/api/v1/events/getgroupdata/',
      {
        method: 'POST',
        headers: { 
          'x-token': null,
          'CONTENT-TYPE': 'application/json'
        },
        body: JSON.stringify({group: mockGroupData})
      }
    ];

    await getGroupTransactionData(mockGroupData);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
})