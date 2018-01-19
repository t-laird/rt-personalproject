/* eslint-disable max-len */

import React from 'react';
import { User, mapStateToProps } from './User';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';
import { mockUserWithoutGroup } from '../../mockData/mockUserWithoutGroup';

describe('user tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<User User={mockUserData} history={[]} />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('should match the snapshot if user does not have a group', () => {
    const renderedApp = shallow(<User User={mockUserWithoutGroup} history={[]} />);
  
    expect(renderedApp).toMatchSnapshot();
  });

  it('should auto-redirect if no user is logged in', () => {
    const renderedApp = shallow(<User User={{}} history={[]} />);

    expect(renderedApp.instance().props.history[0]).toEqual('/snap-ninja/login');
  });
  
  it('should not redirect if a user is logged in', () => {
    const renderedApp = shallow(<User User={mockUserData} history={[]} />);

    expect(renderedApp.instance().props.history.length).toEqual(0);
  });
});

describe('mapStateToProps tests', () => {
  it('should pull user from store', () => {
    const mockStore = { mockUserData };
    const result = mapStateToProps(mockStore);

    expect(result.UserData).toEqual(mockStore.UserData);
  });
});