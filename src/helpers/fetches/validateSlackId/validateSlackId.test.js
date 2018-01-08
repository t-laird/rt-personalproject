import validateSlackId from './validateSlackId';
import { mockApiResponse } from '../../../mockData/mockApiResponses';

global.localStorage = {
  getItem: () => null
};

describe('validate slack id tests', () => {
  window.fetch = jest.fn().mockImplementation(() => 
    Promise.resolve({
      json: () => Promise.resolve(mockApiResponse)
    })
  );

  it('should be a function', () => {
    expect(validateSlackId).toBeAFunction;
  });

  it('validateSlackId is called with the correct params', async () => {
    const mockUserId = 123456;
    const expected = [
      'http://localhost:3000/api/v1/slack',
      {
        method: 'POST',
        headers: {
          'x-token': null,
          'CONTENT-TYPE': 'application/json'
        },
        body: JSON.stringify({
          id: 123456
        })
      }
    ];

    await validateSlackId(mockUserId);
    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });
});
