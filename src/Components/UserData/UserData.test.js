import React from 'react';
import { UserData, mapStateToProps } from './UserData';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';

describe('user data tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<UserData user={mockUserData} />);

    expect(renderedApp).toMatchSnapshot();
  });
});

describe('mapStateToProps tests', () => {
  it('should pull user from store', () => {
    const mockStore = { mockUserData };
    const result = mapStateToProps(mockStore);

    expect(result.User).toEqual(mockStore.User);
  });
});
