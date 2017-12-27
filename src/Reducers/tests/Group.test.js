import Group from '../Group';
import * as actions from '../../Actions';

describe('Group reducer tests', () => {
  it('should return the correct default state', () => {
    const expectedReturn = {};

    expect(Group(undefined, {})).toEqual(expectedReturn);
  });

  it('should return the current state when passed a non-existant action', () => {
    const mockAction = {
      type: 'FAKE_ACTION'
    };

    const mockState = {
      name: 'Google'
    };

    expect(Group(mockState, mockAction)).toEqual(mockState);
  });

  it('should return an updated group when passed an UPDATE_GROUP type action', () => {
    const mockGroup = { name: 'Turing', weekly_points: 100 };
    const expectedReturn = {
      name: 'Turing', weekly_points: 100
    };

    expect(Group({}, actions.updateGroup(mockGroup))).toEqual(expectedReturn);
  });
});