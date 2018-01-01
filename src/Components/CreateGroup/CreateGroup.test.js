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
		const renderedApp = shallow(<CreateGroup user={{}} />)

		expect(renderedApp).toMatchSnapshot();
	})

	it('should set state on input', () => {
		const renderedApp = shallow(<CreateGroup user={{}} />)
		const mockEvent = { target: { name: 'groupName', value: 'def' } }

		renderedApp.instance().handleChange(mockEvent)
		expect(renderedApp.state('groupName')).toEqual('def');
	})

	it('should call updateGroup action when createGroup is invoked', async () => {
		window.fetch = jest.fn().mockImplementation(() =>
	    Promise.resolve({
	      json: () => Promise.resolve([mockGroupData])
	    })
	  );

		const mockUpdateGroup = jest.fn();
		const mockUpdateUser = jest.fn();
		const renderedApp = shallow(<CreateGroup user={{}} updateUser={mockUpdateUser} updateGroup={mockUpdateGroup} />)
		const mockEvent = { preventDefault: jest.fn() }
		const mockGroupName = 'Turing';
		const mockWeeklyPoints = 50;

		await renderedApp.instance().createGroup(mockEvent, mockGroupName, mockWeeklyPoints);
		renderedApp.update();

		expect(mockUpdateGroup).toHaveBeenCalledWith(mockGroupData);
	})

	it('should call updateUser action when createGroup is invoked', async () => {
		window.fetch = jest.fn().mockImplementation(() =>
	    Promise.resolve({
	      json: () => Promise.resolve([mockUserData])
	    })
	  );

		const mockUpdateGroup = jest.fn();
		const mockUpdateUser = jest.fn();
		const renderedApp = shallow(<CreateGroup user={{}} updateUser={mockUpdateUser} updateGroup={mockUpdateGroup} />)
		const mockEvent = { preventDefault: jest.fn() }
		const mockGroupName = 'Turing';
		const mockWeeklyPoints = 50;

		await renderedApp.instance().createGroup(mockEvent, mockGroupName, mockWeeklyPoints);
		renderedApp.update();

		expect(mockUpdateUser).toHaveBeenCalledWith(mockUserData);
	})
})

describe('mapStateToProps tests', () => {

})

describe('mapDispatchToProps tests', () => {
	
})

