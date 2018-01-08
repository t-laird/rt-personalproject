import { shallow } from 'enzyme';
import React from 'react';
import { Header } from './Header';


describe('Header component tests', () => {
  describe('User Logged In tests', () => {
    let renderedHeader;
    let mockProps;
    beforeEach(() => {
      mockProps = {
        logoutUser: jest.fn(),
        user: {user_name: 'jack'},
        group: {group_name: 'turing'}
      };
      renderedHeader = shallow(<Header {...mockProps} />);
    });

    it('should render without crashing', () => {
      expect(renderedHeader).toBeDefined();
    });

    it('With logged in user, should render with the correct components', () => {
      const expectedNavlinks = 9;
      const expectedALinks = 0;

      expect(renderedHeader.find('NavLink').length).toEqual(expectedNavlinks);
      expect(renderedHeader.find('a').length).toEqual(expectedALinks);
    });
  });

  describe('User NOT Logged In tests', () => {
    let renderedHeader;
    let mockProps;
    beforeEach(() => {
      mockProps = {
        logoutUser: jest.fn(),
        user: {},
        group: {}
      };
      renderedHeader = shallow(<Header {...mockProps} />);
    });

    it('WITHOUT logged in user, should render with the correct components', () => {
      const expectedNavlinks = 1;
      const expectedALinks = 1;

      expect(renderedHeader.find('NavLink').length).toEqual(expectedNavlinks);
      expect(renderedHeader.find('a').length).toEqual(expectedALinks);
    });
  });

});