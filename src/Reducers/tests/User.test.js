/* eslint-disable max-len */

import User from '../User';
import * as actions from '../../Actions';

describe('User reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = {};

    expect(User(undefined, {})).toEqual(expectedState);
  });

  it('should return the current state when passed a non-existant action', () => {
    const mockState = {
      name: 'Bob'
    };

    const mockAction = {
      type: 'FAKE_ACTION'
    };

    expect(User(mockState, mockAction)).toEqual(mockState);
  });

  it('should update the user when given the UPDATE_USER action', () => {
    const mockUser = {
      name: 'Bob'
    };

    expect(User({}, actions.updateUser(mockUser))).toEqual(mockUser);
  });

  it('should empty state given a LOGOUT_USER action', () => {
    const expectedState = {};
    const mockUser = {
      name: 'Bob'
    };

    expect(User(mockUser, actions.logoutUser())).toEqual(expectedState);
  });
});