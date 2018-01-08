import React from 'react';
import Homepage from './Homepage';
import { shallow } from 'enzyme';

describe('homepage tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<Homepage />);

    expect(renderedApp).toMatchSnapshot();
  })
})