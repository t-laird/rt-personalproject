import getGroupSettings from './getGroupSettings';
import { mockUserData } from '../../../mockData/mockUserData';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
  getItem: () => null
};

describe('get group settings tests', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockApiResponse)
    })
  );

  it('should be a function', () => {
    expect(getGroupSettings).toBeAFunction;
  });

  it('getGroupSettings is called with the correct params', async () => {
    const expected = [
      'http://localhost:3000/api/v1/group/1',
      {
        method: 'GET',
        headers: { 
          'CONTENT-TYPE': 'application/json',
          'x-token': null
        }
      }
    ];

    await getGroupSettings(mockUserData);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});