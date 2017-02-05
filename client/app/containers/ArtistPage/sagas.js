import { serverUrl } from 'config';

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';

import { LOAD_ARTISTALBUMLIST } from './constants';
import { artistAlbumListLoaded, artistAlbumListLoadingError } from './actions';


export function* getArtistList(action) {
  const { payload: { artistName } } = action;
  const requestURL = `${serverUrl}/artists/${artistName}`;

  try {
    // Call our request helper (see 'utils/request')
    const artistAlbumList = yield call(request, requestURL);
    yield put(artistAlbumListLoaded(artistAlbumList));
  } catch (err) {
    yield put(artistAlbumListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* artistAlbumListData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ARTISTALBUMLIST, getArtistList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  artistAlbumListData,
];
