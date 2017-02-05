/*
 * Homepage reducer
 */

import { fromJS } from 'immutable';

import {
  LOAD_ARTISTALBUMLIST_SUCCESS,
  LOAD_ARTISTALBUMLIST,
  LOAD_ARTISTALBUMLIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  artistAlbumList: false,
});

function artistPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTISTALBUMLIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('artistAlbumList', false);
    case LOAD_ARTISTALBUMLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('artistAlbumList', action.artistAlbumList);
    case LOAD_ARTISTALBUMLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default artistPageReducer;
