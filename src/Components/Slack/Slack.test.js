import { shallow } from 'enzyme';
import React from 'react';
import { Slack, mapStateToProps } from './Slack';
import { mockUserData } from '../../mockData/mockUserData';

describe('Slack component tests', () => {
  let mockProps;
  let renderedSlack;
  beforeEach(() => {
    mockProps = {
      User: mockUserData
    };
    renderedSlack = shallow(<Slack {...mockProps}/>);
  });

  it('should match the snapshot', () => {
    expect(renderedSlack).toMatchSnapshot();
  });

  it('should redirect to the login page if there is no signed in user', () => {
    const newMockProps = {
      User: {},
      history: []
    };

    renderedSlack = shallow(<Slack {...newMockProps} />);

    const expectedHistory = '/snap-ninja/login';

    expect(renderedSlack.instance().props.history).toContain(expectedHistory);
  });

  it('should indicate thatuser has already linked slack account when appropriate', () => {
    renderedSlack.setProps({
      User: {name: 'test', slack_id: 'truthystring'}
    });

    const expectedText = 'You have already connected your Slack and Snap Ninja accounts!';

    expect(renderedSlack.find('h5').text()).toContain(expectedText);
  });

  it('should show a message explaining how to get the slack id if appropriate', () => {
    renderedSlack.setProps({
      User: {name: 'test', slack_id: null}
    });

    const expectedText = 'anywhere in Slack to get your User Id.';

    expect(renderedSlack.find('h5').text()).toContain(expectedText);
  });

  it('should attempt to validate the slack id passed in if handleSubmit is called', () => {
    global.localStorage = {
      getItem: () => JSON.stringify('sljfdsldfj')
    };
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(
      {
        json: () => Promise.resolve({
          status: 'success'
        })
      }
    ));

    renderedSlack.instance().handleSubmit();

    expect(window.fetch).toHaveBeenCalled();
  });
});

describe('mapStateToProps tests', () => {
  it('should map the User to props', () => {
    const mockStore = {
      User: mockUserData
    };

    const result = mapStateToProps(mockStore);

    expect(result.User).toEqual(mockStore.User);
  });
});