
import { fromJS } from 'immutable';
import nowPlayingPageReducer from '../reducer';

describe('nowPlayingPageReducer', () => {
  it('returns the initial state', () => {
    expect(nowPlayingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
