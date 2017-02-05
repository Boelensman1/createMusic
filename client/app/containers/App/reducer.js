/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  /* LOAD_NOWPLAYING,
  LOAD_NOWPLAYING_ERROR, */
  LOAD_NOWPLAYING_SUCCESS,
  LOAD_ACTIVE_PLAYLIST_SUCCESS,
  LOAD_ACTIVE_PLAYLIST,
  LOAD_ACTIVE_PLAYLIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  nowPlaying: false,
  activePlaylistContents: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOWPLAYING_SUCCESS:
      return state
        .set('nowPlaying', action.nowPlayingData);
    case LOAD_ACTIVE_PLAYLIST:
      return state
        .set('error', false);
    case LOAD_ACTIVE_PLAYLIST_SUCCESS:
      return state
        .set('activePlaylistContents', action.activePlaylistContents);
    case LOAD_ACTIVE_PLAYLIST_ERROR:
      return state
        .set('error', action.error);
    default:
      return state;
  }
}

export default appReducer;
