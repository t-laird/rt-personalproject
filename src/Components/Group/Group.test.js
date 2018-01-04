import { Group, mapStateToProps } from './Group';
import React from 'react';
import { shallow } from 'enzyme';
import { mockUserData } from '../../mockData/mockUserData';

describe('Group tests', () => {
  it('Should match the snapshot', () => {
    const renderedApp = shallow(<Group User={mockUserData} />);

    expect(renderedApp).toMatchSnapshot();
  });

  it('should not auto-redirect if a user is signed in', () => {
    const renderedApp = shallow(<Group User={mockUserData} history={[]} />);

    expect(renderedApp.instance().props.history.length).toEqual(0);
  });

  it('should auto-redirect if a user is not signed in', () => {
    const renderedApp = shallow(<Group User={{}} history={[]} />);

    expect(renderedApp.instance().props.history[0]).toEqual('/login');
  });
});

describe('mapStateToProps tests', () => {
  it('should pull user from store', () => {
    const mockStore = { mockUserData };
    const result = mapStateToProps(mockStore);

    expect(result.UserData).toEqual(mockStore.UserData);
  });
});
