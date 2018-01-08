import React from 'react';
import { shallow } from 'enzyme';
import { UserProfile, mapStateToProps } from './UserProfile';
import { mockGroupData } from '../../mockData/mockGroupData';
import mockUserTransactions from '../../mockData/testMockUserTransactions';

describe('UserProfile tests', () => {
  let 
    renderedUserProfile,
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

  it('should match the snapshot if there are no transactions', () => {
    let newProps = {
      UserTransactions: [],
      Group: mockGroupData
    };
    let renderedUserProfile = shallow(<UserProfile {...newProps} />);

    expect(renderedUserProfile).toMatchSnapshot();
  });

  it('getTickValues should return null if there are user transactions in store', () => {
    let renderedUserProfile = shallow(<UserProfile {...mockProps} />);

    expect(renderedUserProfile.instance().getTickValues()).toEqual(null);
  })

  it('getTickValues should return an array of tick values when there are no transactions in store', () => {
    let newProps = {
      UserTransactions: [],
      Group: mockGroupData
    };
    let renderedUserProfile = shallow(<UserProfile {...newProps} />);
    const expected = ['10', '20', '30', '40', '50'];

    expect(renderedUserProfile.instance().getTickValues()).toEqual(expected);
  })
});

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