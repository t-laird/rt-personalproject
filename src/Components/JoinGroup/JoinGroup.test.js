import { JoinGroup, mapStateToProps, mapDispatchToProps } from './JoinGroup';
import React from 'react';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';
import { mockGroupData } from '../../mockData/mockGroupData';

global.localStorage = {
  getItem: () => null
};

describe('Join group tests', () => {
  window.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([mockUserData])
    })
  );

  it('should match the snapshot when NO user is logged in', () => {
    const renderedApp = shallow(<JoinGroup group={{}} user={{}} />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('should match the snapshot when a user is logged in', () => {
    const renderedApp = shallow(<JoinGroup group={ mockGroupData } user={ mockUserData } />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('should update state on input', () => {
    const renderedApp = shallow(<JoinGroup group={{}} user={{}} />);
    const mockEvent = { target: {name: 'passphrase', value: 'abc'} };

    renderedApp.instance().handleChange(mockEvent);
    expect(renderedApp.state('passphrase')).toEqual('abc');
  });

  it('should display a message if joining the same group you are currently in', () => {
    const renderedApp = shallow(<JoinGroup user={{group_id: 5}} group={{group_id: 5, group_passphrase: '12345'}} />);
    const mockEvent = {preventDefault: jest.fn()};
    const expectedMessage = "You're already in that group!";
    renderedApp.setState({
      passphrase: '12345'
    });

    renderedApp.instance().joinGroup(mockEvent);

    expect(renderedApp.state('message').props.children).toEqual(expectedMessage);
  });
  it('should render no message if state says to hide message', () => {
    const renderedApp = shallow(<JoinGroup user={{group_id: 5}} group={{group_id: 5, group_passphrase: '12345'}} />);
    renderedApp.setState({
      hideintro: true
    });
    const messageResponse = renderedApp.instance().groupPageMessage();
  
    expect(messageResponse).toEqual(null);
  });

  it('should render a current group message if in a group currently', () => {
    const renderedApp = shallow(<JoinGroup user={{group_id: 5}} group={{group_id: 5, group_name:'TestGroup', group_passphrase: '12345'}} />);
    const messageResponse = renderedApp.instance().groupPageMessage();
    expect(messageResponse.props.children[0]).toContain('You are a member of:');
  });

  it('should render a message indicating that the user is already in a group if appropriate', () => {
    const renderedApp = shallow(<JoinGroup user={{group_id: 5}} group={{group_id: 5, group_passphrase: '12345'}} />);
    const messageResponse = renderedApp.instance().groupPageMessage();

    expect(messageResponse.props.children).toContain('You are already a member of a group!');    
  });

  it('should indicate that the user should log in if there is no user in store', () => {
    const renderedApp = shallow(<JoinGroup user={{}} group={{group_passphrase: '12345'}} />);
    const messageResponse = renderedApp.instance().groupPageMessage();

    expect(messageResponse.props.children[1]).toContain('to join a group or to see your group status!');
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
    expect(result.user).toEqual(mockStore.User);
    expect(result.group).toEqual(mockStore.Group);
  });
});

describe('mapDispatchToProps tests', () => {
  it('should call dispatch when updateUser is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = {user_name:'Tom', user_id: 3};
    const result = mapDispatchToProps(mockDispatch);
    
    result.updateUser(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch when updateUserTransactions is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = [{sent: [], received: []}];
    const result = mapDispatchToProps(mockDispatch);

    result.updateUserTransactions(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch when updateGroupTransactions is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = [{transactions: []}];
    const result = mapDispatchToProps(mockDispatch);

    result.updateGroupTransactions(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch when updateUserList is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = [{name: 'ann'}, {name: 'mike'}];
    const result = mapDispatchToProps(mockDispatch);

    result.updateUserList(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call dispatch when updateGroup is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = {group_name: 'Test group'};
    const result = mapDispatchToProps(mockDispatch);

    result.updateGroup(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  });
});


