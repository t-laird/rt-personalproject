import React from 'react';
import { Comments, mapStateToProps } from './Comments';
import { shallow } from 'enzyme';
import mockUserTransactions from '../../mockData/mockUserTransactions';

describe('Comments tests', () => {
  it('should match snapshot', () => {
    const renderedApp = shallow(<Comments UserTransactions={[]} />);

    expect(renderedApp).toMatchSnapshot();
  })

  it('getReceivedData should only return recent received points transactions', () => {
    const renderedApp = shallow(<Comments UserTransactions={mockUserTransactions} />);

    expect(renderedApp.instance().getReceivedData().length).toEqual(1);
  })
})

describe('mapStateToProps tests', () => {
  it('should pull user transactions from store', () => {
    const mockStore = { mockUserTransactions };
    const result = mapStateToProps(mockStore);
    
    expect(result.UserTransactions).toEqual(mockStore.UserTransactions)
  })
})
