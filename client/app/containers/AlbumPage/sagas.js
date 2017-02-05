import { serverUrl } from 'config';

import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';

import { LOAD_ALBUMSONGLIST } from './constants';
import { albumSongListLoaded, albumSongListLoadingError } from './actions';


export function* getAlbumSongList(action) {
  const { payload: { albumArtist, albumName } } = action;
  const requestURL = `${serverUrl}/artists/${albumArtist}/albums/${albumName}`;

  try {
    // Call our request helper (see 'utils/request')
    const albumSongList = yield call(request, requestURL);
    yield put(albumSongListLoaded(albumSongList));
  } catch (err) {
    yield put(albumSongListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* albumSongListData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ALBUMSONGLIST, getAlbumSongList);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  albumSongListData,
];
