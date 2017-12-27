import { shallow } from 'enzyme';
import React from 'react';
import {
  Header,
  mapDispatchToProps
} from './Header';


describe('Header component tests', () => {
  let renderedHeader;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      logoutUser: jest.fn()
    };
    renderedHeader = shallow(<Header {...mockProps} />);
  });

  it('should render without crashing', () => {
    expect(renderedHeader).toBeDefined();
  });

  it('should render with the correct default components', () => {
    const expectedNavlinks = 4;
    const expectedALinks = 1;

    expect(renderedHeader.find('NavLink').length).toEqual(expectedNavlinks);
    expect(renderedHeader.find('a').length).toEqual(expectedALinks);
  });
});