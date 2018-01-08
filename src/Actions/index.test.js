import * as actions from './index';

describe('actions tests', () => {
  it('should return an action with type UPDATE_USER and expected payload', () => {
    const mockUser = {name: 'Mike', user_id: 3, email: 'wuvoz@gmail.com'};
    const expectedResponse = {
      type: 'UPDATE_USER',
      user: mockUser
    };

    expect(actions.updateUser(mockUser)).toEqual(expectedResponse);
  });

  it('should return an action with type LOGOUT_USER and expected payload', () => {
    const expectedResponse = {
      type: 'LOGOUT_USER'
    };

    expect(actions.logoutUser()).toEqual(expectedResponse);
  });

  it('should return an action with type UPDATE_GROUP and expected payload', () => {
    const mockGroup = {
      name: 'Turing', weekly_points: 100, administrator: 120
    };
    const expectedResponse = {
      type: 'UPDATE_GROUP',
      group: mockGroup
    };

    expect(actions.updateGroup(mockGroup)).toEqual(expectedResponse);
  });

  it('should return an action with type UPDATE_TRANSACTIONS and expected payload', () => {
    const mockTransactions = [
      {sent: [{send_id: 1, receive_id: 5}], received: [{send_id: 5, receive_id: 1}]}
    ];
    const expectedResponse = {
      type: 'UPDATE_TRANSACTIONS',
      transactions: mockTransactions
    };

    expect(actions.updateUserTransactions(mockTransactions)).toEqual(expectedResponse);
  });

  it('should return an action with type UPDATE_USERS and expected payload', () => {
    const mockUsers = [{name: 'James'}, {name: 'Ralphie'}];
    const expectedResponse = {
      type: 'UPDATE_USERS',
      users: mockUsers
    };

    expect(actions.updateUserList(mockUsers)).toEqual(expectedResponse);
  });
});