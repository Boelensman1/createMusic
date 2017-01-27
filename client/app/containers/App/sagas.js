import { take, call, put, cancel, takeEvery, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { SEND_PLAYBACK_COMMAND, LOAD_NOWPLAYING } from 'containers/App/constants';

import { nowPlayingLoaded, nowPlayingLoadingError } from './actions';

export function* sendPlaybackCommand(action) {
  const requestURL = 'http://localhost:3030/playback';

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, `${requestURL}/${action.payload}`, {
      method: 'PUT',
    });
    // yield put(artistListLoaded(artistList));
  } catch (err) {
    // yield put(artistListLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* playbackCommandWatcher() {
  // Watches for SEND_PLAYBACK_COMMAND actions and calls senPlaybackCommand when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeEvery(SEND_PLAYBACK_COMMAND, sendPlaybackCommand);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* loadNowPlaying() {
  const requestURL = 'http://localhost:3030/playback/status';

  try {
    // Call our request helper (see 'utils/request')
    const nowPlayingData = yield call(request, requestURL);
    yield put(nowPlayingLoaded(nowPlayingData));
  } catch (err) {
    yield put(nowPlayingLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* loadNowPlayingWatcher() {
  // Watches for SEND_PLAYBACK_COMMAND actions and calls loadNowPlaying when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_NOWPLAYING, loadNowPlaying);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  playbackCommandWatcher,
  loadNowPlayingWatcher,
];
