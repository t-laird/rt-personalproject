import Group from './Group';
import React from 'react';
import { shallow } from 'enzyme';

describe('Group tests', () => {
  it('Should match the snapshot', () => {
    const renderedApp = shallow(<Group />);

    expect(renderedApp).toMatchSnapshot();
  });
});