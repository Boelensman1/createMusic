import { createSelector } from 'reselect';

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

/**
 * Default selector used by NowPlayingPage
 */
const makeSelectNowPlayingPage = () => createSelector(
  selectNowPlayingPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectNowPlayingPage;
export {
  selectNowPlayingPageDomain,
  makeSelectActivePlaylistContents,
  makeSelectLoading,
  makeSelectError,
};
