/* eslint-disable max-len */

import UserList from '../UserList';
import * as actions from '../../Actions';

describe('UserList reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = [];

    expect(UserList(undefined, {})).toEqual(expectedState);
  });

  it('should return the current state when passed a non-existant action', () => {
    const mockState = [
      {name: 'Michelle'}, {name: 'George'}
    ];

    const mockAction = {
      type: 'FAKE_ACTION'
    };

    expect(UserList(mockState, mockAction)).toEqual(mockState);
  });

  it('should update the user list when given the UPDATE_USERS action', () => {
    const mockUsers = [
      {name: 'Michelle'}, {name: 'George'}
    ];

    expect(UserList([], actions.updateUserList(mockUsers))).toEqual(mockUsers);
  });
});