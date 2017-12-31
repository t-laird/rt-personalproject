import getUser from './getUser';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
	getItem: () => null
};

describe('get user tests', () => {
	window.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
	    json: () => Promise.resolve(mockApiResponse)
		})
	);

	it('should be a function', () => {
    expect(getUser).toBeAFunction;
  });

  it('getUser is called with the correct params', async () => {
    const expected = [
      'http://localhost:3000/api/v1/users/',
      {
        method: 'GET',
        headers: { 
          'x-token': null,
          'CONTENT-TYPE': 'application/json'
        },
      }
    ];

    await getUser();
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
})
