import getTransactionData from './getTransactionData';
import { mockUserData } from '../../../mockData/mockUserData';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
  getItem: () => null
};

describe('get transaction data tests', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
	    json: () => Promise.resolve(mockApiResponse)
    })
  );

  it('should be a function', () => {
    expect(getTransactionData).toBeAFunction;
  });

  it('getTransactionData is called with the correct params', async () => {
    const expected = [
      'http://localhost:3000/api/v1/events/getuserdata/',
      {
        method: 'POST',
        headers: { 
          'x-token': null,
          'CONTENT-TYPE': 'application/json'
        },
        body: JSON.stringify({user: mockUserData})
      }
    ];

    await getTransactionData(mockUserData);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});