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

  it('should call update user action when joinGroup is invoked', async () => {
    const mockUpdateUser = jest.fn();
    const renderedApp = shallow(<JoinGroup group={{}} user={{}} updateUser={mockUpdateUser} />);
    const mockEvent = { preventDefault: jest.fn() };
    await renderedApp.instance().joinGroup(mockEvent);
    renderedApp.update();

    expect(mockUpdateUser).toHaveBeenCalledWith(mockUserData);
  });
});

describe('mapStateToProps tests', () => {

});

describe('mapDispatchToProps tests', () => {
	
});


