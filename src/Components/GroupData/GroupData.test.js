import React from 'react';
import { GroupData, mapStateToProps } from './GroupData';
import { mockGroupData } from '../../mockData/mockGroupData';
import mockGroupTransactions from '../../mockData/mockGroupTransactions';
import { shallow } from 'enzyme';

describe('group data tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<GroupData group={mockGroupData} GroupTransactions={mockGroupTransactions} />);

    expect(renderedApp).toMatchSnapshot();
  })

  it('total should return a total of all group points', () => {
    const renderedApp = shallow(<GroupData group={mockGroupData} GroupTransactions={mockGroupTransactions} />);

    expect(renderedApp.instance().totalPoints()).toEqual(25);
  })

  it('currentPoints should return a total of current group points', () => {
    const renderedApp = shallow(<GroupData group={mockGroupData} GroupTransactions={mockGroupTransactions} />);

    expect(renderedApp.instance().currentPoints()).toEqual(25);
  })
})

describe('mapStateToProps tests', () => {
  it('should pull group transactions from store', () => {
    const mockStore = { mockGroupTransactions };
    const result = mapStateToProps(mockStore);

    expect(result.GroupTransactions).toEqual(mockStore.GroupTransactions);
  })

  it('should pull group data from store', () => {
    const mockStore = { mockGroupData };
    const result = mapStateToProps(mockStore);

    expect(result.group).toEqual(mockStore.group);
  })
})
