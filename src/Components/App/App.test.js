import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router';
import { shallow } from 'enzyme';


describe('app tests', () => {
  let renderedApp;
  beforeEach(() => {
    renderedApp = shallow(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  });
  
  it('renders without crashing', () => {
    expect(renderedApp).toBeDefined();
  });

  it.skip('should render with the correct default elements', () => {
    expect(renderedApp.find('App').length).toEqual(1);
  });

});
