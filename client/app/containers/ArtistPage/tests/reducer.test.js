
import { fromJS } from 'immutable';
import artistPageReducer from '../reducer';

describe('artistPageReducer', () => {
  it('returns the initial state', () => {
    expect(artistPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
