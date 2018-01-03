import { CreateGroup, mapStateToProps, mapDispatchToProps } from './CreateGroup';
import React from 'react';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';
import { mockGroupData } from '../../mockData/mockGroupData';

global.localStorage = {
  getItem: () => null
};

describe('Create group tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<CreateGroup user={{}} />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('should set state on input', () => {
    const renderedApp = shallow(<CreateGroup user={{}} />);
    const mockEvent = { target: { name: 'groupName', value: 'def' } };

    renderedApp.instance().handleChange(mockEvent);
    expect(renderedApp.state('groupName')).toEqual('def');
  });

  it('should call updateGroup action when createGroup is invoked', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockGroupData])
      })
    );

    const mockUpdateGroup = jest.fn();
    const mockUpdateUser = jest.fn();
    const renderedApp = shallow(<CreateGroup user={{}} updateUser={mockUpdateUser} updateGroup={mockUpdateGroup} />);
    const mockEvent = { preventDefault: jest.fn() };
    const mockGroupName = 'Turing';
    const mockWeeklyPoints = 50;

    await renderedApp.instance().createGroup(mockEvent, mockGroupName, mockWeeklyPoints);
    renderedApp.update();

    expect(mockUpdateGroup).toHaveBeenCalledWith(mockGroupData);
  });

  it('should call updateUser action when createGroup is invoked', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([mockUserData])
      })
    );

    const mockUpdateGroup = jest.fn();
    const mockUpdateUser = jest.fn();
    const renderedApp = shallow(<CreateGroup user={{}} updateUser={mockUpdateUser} updateGroup={mockUpdateGroup} />);
    const mockEvent = { preventDefault: jest.fn() };
    const mockGroupName = 'Turing';
    const mockWeeklyPoints = 50;

    await renderedApp.instance().createGroup(mockEvent, mockGroupName, mockWeeklyPoints);
    renderedApp.update();

    expect(mockUpdateUser).toHaveBeenCalledWith(mockUserData);
  });
});

describe('mapStateToProps tests', () => {
  it('should pull user from store', () => {
    const mockStore = { mockUserData };
    const result = mapStateToProps(mockStore);

    expect(result.UserData).toEqual(mockStore.UserData)
  })
});

describe('mapDispatchToProps tests', () => {
  it('should call dispatch when updateGroup is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = {mockGroupData};
    const result = mapDispatchToProps(mockDispatch);

    result.updateGroup(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  })

  it('should call dispatch when updateUser is called', () => {
    const mockDispatch = jest.fn();
    const mockParams = {mockUserData};
    const result = mapDispatchToProps(mockDispatch);

    result.updateGroup(mockParams);
    expect(mockDispatch).toHaveBeenCalled();
  })
});

