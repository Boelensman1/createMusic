/*
 * Homepage reducer
 */

import { fromJS } from 'immutable';

import {
  LOAD_ARTISTLIST_SUCCESS,
  LOAD_ARTISTLIST,
  LOAD_ARTISTLIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  artistList: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ARTISTLIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('artistList', false);
    case LOAD_ARTISTLIST_SUCCESS:
      return state
        .set('loading', false)
        .set('artistList', action.artistList);
    case LOAD_ARTISTLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default homePageReducer;
