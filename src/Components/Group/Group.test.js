import { Group, mapStateToProps } from './Group';
import React from 'react';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';

describe('Group tests', () => {
  it('Should match the snapshot', () => {
    const renderedApp = shallow(<Group User={mockUserData} />);

    expect(renderedApp).toMatchSnapshot();
  });
});
