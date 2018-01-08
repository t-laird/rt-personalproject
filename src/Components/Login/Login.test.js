import React from 'react';
import { Login, mapDispatchToProps } from './Login';
import { shallow } from 'enzyme';

describe('Login component tests', () => {
  let renderedLogin;
  let mockProps;

  beforeEach(() => {
    global.localStorage = {
      getItem: () => JSON.stringify('sldfkjsdf'),
      setItem: () => undefined
    };

    mockProps = {
      logoutUser: jest.fn(),
      updateUser: jest.fn(),
      updateUserTransactions: jest.fn(),
      updateGroupTransactions: jest.fn(),
      updateUserList: jest.fn(),
      updateGroup: jest.fn(),
      history: [],
      location: {search: '/login'}
    };

    renderedLogin = shallow(<Login {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(renderedLogin).toMatchSnapshot();
  });

  it.skip('should immediately push the /slack to history if coming from /login/slack', async () => {
    const newMockProps = {
      logoutUser: jest.fn(),
      updateUser: jest.fn(),
      updateUserTransactions: jest.fn(),
      updateGroupTransactions: jest.fn(),
      updateUserList: jest.fn(),
      updateGroup: jest.fn(),
      history: [],
      location: {search: '/login', pathname: '/login/slack'}
    };

    renderedLogin = shallow(<Login {...newMockProps} />);
    renderedLogin.update();

    const expectedHistory = '/slack';

    await expect(renderedLogin.instance().props.history).toContain(expectedHistory);
  });

  it.skip('should redirect to the loginrocket site if there is no key in localStorage or in location.search', () => {
    window.location = '';
    global.localStorage = {
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined
    };
    
    renderedLogin.instance().checkForKey();
    
    const expectedWindowLocation = "https://tr-personal-proj.e1.loginrocket.com/";
    expect(window.location).toEqual(expectedWindowLocation);
  });

  it('should call window.fetch in fetchUserData', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        User: {name: 'Test'}
      })
    }));

    renderedLogin.instance().fetchUserData();

    expect(window.fetch).toHaveBeenCalled();
  });

  it('should call window.fetch in loadUsersInGroup', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({
        User: {name: 'Test'}
      })
    }));

    renderedLogin.instance().loadUsersInGroup({group_id: 1});

    expect(window.fetch).toHaveBeenCalled();
  });
});

describe('mapDispatchToProps test', () => {
  it('should map logoutUser and updateUser to dispatch', () => {
    const mockDisaptch = jest.fn();
    const result = mapDispatchToProps(mockDisaptch);

    result.logoutUser();
    result.updateUser();

    expect(mockDisaptch).toHaveBeenCalled();
  });

  it('should map updateUserTransactions and updateGroupTransactions to dispatch', () => {
    const mockDisaptch = jest.fn();
    const result = mapDispatchToProps(mockDisaptch);

    result.updateUserTransactions();
    result.updateGroupTransactions();

    expect(mockDisaptch).toHaveBeenCalled();
  });

  it('should map updateUserList and updateGroup to dispatch', () => {
    const mockDisaptch = jest.fn();
    const result = mapDispatchToProps(mockDisaptch);

    result.updateUserList();
    result.updateGroup();

    expect(mockDisaptch).toHaveBeenCalled();
  });
});