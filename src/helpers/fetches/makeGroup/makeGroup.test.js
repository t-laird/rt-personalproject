import makeGroup from './makeGroup';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
  getItem: () => null
};

window.group_passphrase = {
  group_passphrase: () => null
};

describe('make group tests', () => {
  window.fetch = jest.fn().mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockApiResponse)
    })
  );

  it('should be a function', () => {
    expect(makeGroup).toBeAFunction;
  });

  it('makeGroup is called with the correct params', async () => {
    const mockGroupName = 'Turing';
    const mockPassword = 'f3fj8h';
    const mockPoints = 50;
    const expected = [
      'http://localhost:3000/api/v1/group/new',
      {
        method: 'POST',
        body: JSON.stringify({
          group_name: 'Turing',
          group_passphrase: 'f3fj8h',
          weekly_points: 50
        }),
        headers: {
          'Content-Type': 'application/json',
          'x-token': null
        }
      }
    ];

    await makeGroup(mockGroupName, mockPoints, mockPassword);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});