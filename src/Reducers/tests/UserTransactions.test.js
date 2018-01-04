/* eslint-disable max-len */

import UserTransaction from '../UserTransactions';
import * as actions from '../../Actions';

describe('UserTransaction reducer tests', () => {
  it('returns the correct default state', () => {
    const expectedState = [];

    expect(UserTransaction(undefined, {})).toEqual(expectedState);
  });

  it('should return the current state when passed a non-existant action', () => {
    const mockState = [
      {sent: [], received: []}
    ];

    const mockAction = {
      type: 'FAKE_ACTION'
    };

    expect(UserTransaction(mockState, mockAction)).toEqual(mockState);
  });

  it('should update the user transactions when given the TRANSACTIONS action', () => {
    const mockTransactions = [
      {sent: [{points: 5}, {points: 10}], received: [{points: 3}, {points: 10}]}
    ];

    expect(UserTransaction([], actions.updateUserTransactions(mockTransactions))).toEqual(mockTransactions);
  });
});