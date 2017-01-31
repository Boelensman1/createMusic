import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel, takeEvery, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';

import { LOCATION_CHANGE } from 'react-router-redux';
import { SEND_PLAYBACK_COMMAND, LOAD_NOWPLAYING } from 'containers/App/constants';

import { nowPlayingLoaded, nowPlayingLoadingError } from './actions';

import Primus from '../../../primus';


function connect() {
  const primus = Primus.connect('http://localhost:3030');
  return new Promise((resolve) => {
    primus.on('open', () => {
      resolve(primus);
    });
  });
}

export function* sendPlaybackCommand(action) {
  const { command, payload } = action;
  const requestBaseUrl = 'http://localhost:3030/playback';

  const requestUrl = `${requestBaseUrl}/${command}`;

  const options = { method: 'POST', headers: { 'Content-Type': 'application/json' } };
  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestUrl, options);
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

function subscribe(primus) {
  return eventChannel((emit) => {
    primus.on('data', (data) => {
      switch (data.event) {
        case 'changed-player':
          emit(nowPlayingLoaded(data.payload));
          break;
        default:
          console.log('Unknown event', event); // eslint-disable-line no-console
      }
    });
    return () => {};
  });
}

function* read(primus) {
  const channel = yield call(subscribe, primus);
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(primus) {
  yield fork(read, primus);
}

function* flow() {
  const primus = yield call(connect);

  yield fork(handleIO, primus);
}

function* primusWatcher() {
  yield fork(flow);
}

// Bootstrap sagas
export default [
  playbackCommandWatcher,
  loadNowPlayingWatcher,
  primusWatcher,
];
