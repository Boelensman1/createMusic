/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectIsPlaying = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nowPlaying') && globalState.get('nowPlaying').state === 'play'
);

const makeSelectTimingInfo = () => createSelector(
  selectGlobal,
  (globalState) => (globalState.get('nowPlaying') && {
    elapsed: globalState.get('nowPlaying').elapsed,
    duration: globalState.get('nowPlaying').duration,
  })
);

const makeSelectNowPlayingId = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('nowPlaying') && globalState.get('nowPlaying').songId
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const makeSelectActivePlaylistContents = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('activePlaylistContents')
);

const makeSelectNowPlaying = () => createSelector(
  selectGlobal,
  (globalState) => {
    const nowPlaying = globalState.get('nowPlaying');
    const activePlaylistContent = globalState.get('activePlaylistContents');
    if (
      !nowPlaying ||
      !activePlaylistContent ||
      activePlaylistContent.length === 0 ||
      nowPlaying.song === null) {
      return false;
    }
    const currentSong = activePlaylistContent[nowPlaying.song];
    currentSong.duration = nowPlaying.duration; // more precise
    currentSong.elapsed = nowPlaying.elapsed;
    return currentSong;
  }
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocationState,
  makeSelectIsPlaying,
  makeSelectNowPlayingId,
  makeSelectTimingInfo,
  makeSelectActivePlaylistContents,
  makeSelectNowPlaying,
};
