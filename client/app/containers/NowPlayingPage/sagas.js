import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';

import { LOAD_ACTIVE_PLAYLIST } from './constants';
import { activePlayListLoaded, activePlayListLoadingError } from './actions';


export function* getActivePlaylistContents() {
  const requestURL = 'http://localhost:3030/playlists/current';

  try {
    // Call our request helper (see 'utils/request')
    const activePlaylistContents = yield call(request, requestURL);
    yield put(activePlayListLoaded(activePlaylistContents.current));
  } catch (err) {
    yield put(activePlayListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* activePlayListData() {
  // Watches for LOAD_ACTIVE_PLAYLIST actions and calls getActivePlayListContents
  // when one comes in. By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ACTIVE_PLAYLIST, getActivePlaylistContents);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  activePlayListData,
];
