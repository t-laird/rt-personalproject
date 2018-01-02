import React from 'react';
import CommentCard from './CommentCard';
import { shallow } from 'enzyme';

describe('Comment card tests', () => {
  it('should match the snapshot', () => {
    const renderedApp = shallow(<CommentCard />);

    expect(renderedApp).toMatchSnapshot();
  });
});