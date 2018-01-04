/* eslint-disable max-len */

import React from 'react';
import { shallow } from 'enzyme';
import { Leaderboard, mapStateToProps } from './Leaderboard';
import mockGroupTransactions from '../../mockData/mockGroupTransactions';

describe('leaderboard tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<Leaderboard GroupTransactions={{}} />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('with send_name passed in, getData should return current leaders in sending points', () => {
    const renderedApp = shallow(<Leaderboard GroupTransactions={mockGroupTransactions} />);
    const expected = [ 
      { name: 'Jim Davis', points: 15 },
      { name: 'Deion Sanders', points: 10 }
    ];

    expect(renderedApp.instance().getData('send_name')).toEqual(expected);
  });

  it('with received_name passed in, getData should return current leaders in receiving points', () => {
    const renderedApp = shallow(<Leaderboard GroupTransactions={mockGroupTransactions} />);
    const expected = [
      { name: 'Scott Adams', points: 15 }, 
      { name: 'Bo Jackson', points: 10 }
    ];

    expect(renderedApp.instance().getData('received_name')).toEqual(expected);
  });
});

describe('mapStateToProps tests', () => {
  it('should pull user transactions from store', () => {
    const mockStore = { mockGroupTransactions };
    const result = mapStateToProps(mockStore);

    expect(result.GroupTransactions).toEqual(mockStore.GroupTransactions);
  });
});