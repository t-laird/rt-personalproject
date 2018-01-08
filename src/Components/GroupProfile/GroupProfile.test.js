import React from 'react';
import { shallow } from 'enzyme';
import { GroupProfile, mapStateToProps } from './GroupProfile';
import mockGroupTransactions from '../../mockData/mockGroupTransactions';
import { mockGroupData } from '../../mockData/mockGroupData';

describe('group profile tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<GroupProfile GroupTransactions={mockGroupTransactions} Group={mockGroupData} />);

    expect(renderedApp).toMatchSnapshot();
  })

  it('should match the snapshot when there are no transactions', () => {
    const renderedApp = shallow(<GroupProfile GroupTransactions={[]} Group={mockGroupData} />);

    expect(renderedApp).toMatchSnapshot();
  })

  it('getTickValues should return null when there are transactions in store', () => {
    const renderedApp = shallow(<GroupProfile GroupTransactions={mockGroupTransactions} Group={mockGroupData} />);

    expect(renderedApp.instance().getTickValues()).toEqual(null);
  })

  it('getTickValues should return an array when there are no transactions in store', () => {
    const renderedApp = shallow(<GroupProfile GroupTransactions={[]} Group={mockGroupData} />);

    expect(renderedApp.instance().getTickValues()).toEqual(['100', '200', '300', '400', '500']);
  })
})

describe('mapStateToProps tests', () => {
  it('should pull group transactions and group from store', () => {
    const mockStore = {
      GroupTransactions: mockGroupTransactions,
      Group: mockGroupData
    }
    const result = mapStateToProps(mockStore);

    expect(result.GroupTransactions).toEqual(mockStore.GroupTransactions);
    expect(result.Group).toEqual(mockStore.Group)
  })
})