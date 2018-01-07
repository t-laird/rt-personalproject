/* eslint-disable max-len */

import { mapStateToProps, Transaction } from './Transaction';
import { shallow } from 'enzyme';
import React from 'react';

describe('Transaction component tests', () => {
  let mockProps;
  let renderedTransaction;

  beforeEach(() => {
    mockProps = {
      UserTransactions: [{sent: [], received: []}],
      UserList: [
        {name: 'Ann', user_id: 1}, 
        {name: 'Jen', user_id: 2}, 
        {name: 'Tim', user_id: 3}, 
        {name: 'Alan', user_id: 4}
      ],
      User: {
        authrocket_id: "usr_0vXXFrAmpjSWXnr7n2x2m8",
        created_date: "2017-11-18T18:34:30.017Z",
        email: "t6r6l5@gmail.com",
        group_id: '19vns',
        user_id: 20,
        name: "Thomas Laird"
      },
      Group: {
        administrator_id: 957,
        created_date: "2017-10-18T18:34:30.017Z",
        group_id: 15,
        group_name: null,
        group_passphrase: "19vns",
        weekly_points: 1000
      }
    };

    renderedTransaction = shallow(<Transaction {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(renderedTransaction).toMatchSnapshot();
  });

  it('should update the state of recipient field on input', () => {
    const mockEvent = { target: {name: 'recipient', value: 'abc'}};

    renderedTransaction.instance().handleInput(mockEvent);

    expect(renderedTransaction.state('recipient')).toEqual('abc');
  });

  it('should update the state of points field on input', () => {
    const mockEvent = { target: {name: 'points', value: '100'}};

    renderedTransaction.instance().handleInput(mockEvent);

    expect(renderedTransaction.state('points')).toEqual('100');
  });
  
  it('should update the state of note field on input', () => {
    const mockEvent = { target: {name: 'note', value: 'thanks'}};

    renderedTransaction.instance().handleInput(mockEvent);

    expect(renderedTransaction.state('note')).toEqual('thanks');
  });

  it('should set the transactionMessage to appropriately when user input is not found', () => {
    const expectedMessage = "We can't find your receiving user.  You should try again!";

    renderedTransaction.setState({
      recipient: 'sdkfdfsd'
    });

    renderedTransaction.instance().handleSubmit();

    expect(renderedTransaction.state('transactionMessage')).toEqual(expectedMessage);
  });

  it('should set the transactionMessage to a success message with valid recipient and input', async () => {
    global.localStorage = {
      getItem: () => null
    };

    window.fetch = jest.fn().mockImplementation( () =>
      Promise.resolve({
        json: () => Promise.resolve({
          status: 'success'

        })
      })
    );

    renderedTransaction.setState({
      recipient: 'Alan',
      points: '10'
    });

    await renderedTransaction.instance().handleSubmit();
    renderedTransaction.update();

    const expectedMessage = 'Successfully sent 10 points to Alan.';

    expect(renderedTransaction.state('transactionMessage')).toEqual(expectedMessage);
  });

  it('should populate the suggestions to display on recipient input', () => {
    const mockEvent = {target: {value: 'Al'}};

    renderedTransaction.instance().populateSuggestions(mockEvent);

    const expectedSuggestions = [
      "Alan"
    ];

    expect(renderedTransaction.state('suggestions')).toEqual(expectedSuggestions);
  });

  it('should render a NO USERS FOUND message if suggestions array is empty on input', async () => {
    renderedTransaction.setState({
      recipient: 'aslkfjasdf'
    });

    const suggestionsResult = renderedTransaction.instance().generateSuggestions();

    expect(suggestionsResult.props.children).toEqual('no users found');
  });
});

describe('mapStateToProps tests', () => {
  it('should get user and group info from store', () => {
    const mockStore = {
      User: {
        authrocket_id: "usr_0vXXFrAmpjSWXnr7n2x2m8",
        created_date: "2017-11-18T18:34:30.017Z",
        email: "t6r6l5@gmail.com",
        group_id: '19vns',
        user_id: 20,
        name: "Thomas Laird"
      },
      Group: {
        administrator_id: 957,
        created_date: "2017-10-18T18:34:30.017Z",
        group_id: 15,
        group_name: null,
        group_passphrase: "19vns",
        weekly_points: 1000
      }
    };

    const result = mapStateToProps(mockStore);
    expect(result.User).toEqual(mockStore.User);
    expect(result.Group).toEqual(mockStore.Group);
  });

  it('should get user transactions and userlist from store', () => {
    const mockStore = {
      UserTransactions: [{sent: [], received: []}],
      UserList: [{name: 'Ann', user_id: 1}, {name: 'Jen', user_id: 2}]
    };

    const result = mapStateToProps(mockStore);
    expect(result.UserTransactions).toEqual(mockStore.UserTransactions);
    expect(result.UserList).toEqual(mockStore.UserList);
  });
});