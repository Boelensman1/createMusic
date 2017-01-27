import { take, call, put, cancel, takeEvery } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import { SEND_PLAYBACK_COMMAND } from 'containers/App/constants';

import request from 'utils/request';

export function* sendPlaybackCommand(action) {
  const requestURL = 'http://localhost:3030/playback';

  try {
    // Call our request helper (see 'utils/request')
    const playbackRequest = yield call(request, `${requestURL}/${action.payload}`, {
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
  // Watches for SEND_PLAYBACK_COMMAND actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeEvery(SEND_PLAYBACK_COMMAND, sendPlaybackCommand);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  playbackCommandWatcher,
];
