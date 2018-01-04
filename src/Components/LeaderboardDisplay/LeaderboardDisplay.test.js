import React from 'react';
import { shallow } from 'enzyme';
import LeaderboardDisplay from './LeaderboardDisplay';

describe('leaderboard display tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<LeaderboardDisplay />);

    expect(renderedApp).toMatchSnapshot();
  });
});