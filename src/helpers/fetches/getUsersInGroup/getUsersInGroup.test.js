import getUsersInGroup from './getUsersInGroup';
import { mockUserData } from '../../../mockData/mockUserData';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
	getItem: () => null
};

describe('get users in group tests', () => {
	window.fetch = jest.fn().mockImplementation(() =>
		Promise.resolve({
	    json: () => Promise.resolve(mockApiResponse)
		})
	);

	it('should be a function', () => {
    expect(getUsersInGroup).toBeAFunction;
  });

  it('getUsersInGroup is called with the correct params', async () => {
    const expected = [
      'http://localhost:3000/api/v1/users/group/1',
      {
        method: 'GET',
        headers: { 
          'x-token': null,
          'CONTENT-TYPE': 'application/json'
        },
      }
    ];

    await getUsersInGroup(mockUserData);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
})