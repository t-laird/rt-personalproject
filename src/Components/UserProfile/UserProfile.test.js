import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile, mapStateToProps } from './UserProfile';
import { mockUserData } from '../../mockData/mockUserData';
import { mockGroupData } from '../../mockData/mockGroupData';
import { mockUserList } from '../../mockData/mockUserList';
import mockUserTransactions from '../../mockData/testMockUserTransactions';

describe('UserProfile tests', () => {
  let renderedUserProfile,
      mockProps;
  beforeEach(() => {
    mockProps = {
      UserTransactions: mockUserTransactions,
      Group: mockGroupData
    };
    renderedUserProfile = shallow(<UserProfile {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(renderedUserProfile).toMatchSnapshot();
  });
});

it('should match the snapshot if there are no transactions', () => {
  let newProps = {
    UserTransactions: [],
    Group: mockGroupData
  };
  let renderedUserProfile = shallow(<UserProfile {...newProps} />);
  expect(renderedUserProfile).toMatchSnapshot();
})

describe('mapStateToProps tests', () => {
  it('should map usertransactions and group to the store', () => {
    const mockStore = {
      UserTransactions: mockUserTransactions,
      Group: mockGroupData
    };

    const result = mapStateToProps(mockStore);

    expect(result.UserTransactions).toEqual(mockStore.UserTransactions);
    expect(result.Group).toEqual(mockStore.Group);
  });
});