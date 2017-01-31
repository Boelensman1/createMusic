import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

/**
 * Direct selector to the nowPlayingPage state domain
 */
const selectNowPlayingPageDomain = () => (state) => state.get('nowPlayingPage');

/**
 * Other specific selectors
 */
const makeSelectActivePlaylistContents = () => createSelector(
  selectNowPlayingPageDomain(),
  (substate) => substate.get('activePlaylistContents')
);

const makeSelectLoading = () => createSelector(
  selectNowPlayingPageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectNowPlayingPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectNowPlaying = () => createSelector(
  selectGlobal,
  selectNowPlayingPageDomain(),
  (globalState, substate) => {
    const nowPlaying = globalState.get('nowPlaying');
    const activePlaylistContent = substate.get('activePlaylistContents');
    if (!nowPlaying || !activePlaylistContent) { return false; }
    const currentSong = activePlaylistContent[nowPlaying.song];
    currentSong.duration = nowPlaying.duration; // more precise
    currentSong.elapsed = nowPlaying.elapsed;
    return currentSong;
  }
);


export {
  makeSelectActivePlaylistContents,
  makeSelectLoading,
  makeSelectNowPlaying,
  makeSelectError,
};
