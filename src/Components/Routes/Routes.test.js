import { MemoryRouter } from 'react-router';
import Routes from './Routes';
import { shallow } from 'enzyme';
import React from 'react';

describe('Routes tests', () => {
  let renderedRoutes;

  beforeEach(() => {
    renderedRoutes = shallow(
      <MemoryRouter>
        <Routes/>
      </MemoryRouter>
    );
  });

  it('should render without crashing', () => {
    expect(renderedRoutes).toBeDefined();
  });

  it.skip('should render the correct default elements', () => {
    const expectedRoutes = 1;

    expect(renderedRoutes.find('Routes').length).toEqual(expectedRoutes);
  });
});