/*
 * Homepage reducer
 */

import { fromJS } from 'immutable';

import {
  LOAD_ALBUMSONGLIST_SUCCESS,
  LOAD_ALBUMSONGLIST,
  LOAD_ALBUMSONGLIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  albumSongList: false,
});

function albumPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALBUMSONGLIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('albumSongList', false);
    case LOAD_ALBUMSONGLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('albumSongList', action.albumSongList);
    case LOAD_ALBUMSONGLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default albumPageReducer;
