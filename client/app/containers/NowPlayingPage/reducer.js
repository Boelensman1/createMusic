/*
 *
 * NowPlayingPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_ACTIVE_PLAYLIST_SUCCESS,
  LOAD_ACTIVE_PLAYLIST,
  LOAD_ACTIVE_PLAYLIST_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  activePlaylistContents: false,
});

function nowPlayingPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVE_PLAYLIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('activePlaylistContents', false);
    case LOAD_ACTIVE_PLAYLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('activePlaylistContents', action.activePlaylistContents);
    case LOAD_ACTIVE_PLAYLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default nowPlayingPageReducer;
