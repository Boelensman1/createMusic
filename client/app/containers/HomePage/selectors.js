/**
 * The homepage state selectors
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the nowPlayingPage state domain
 */
const selectHomePagePageDomain = () => (state) => state.get('homePage');

const makeSelectLoading = () => createSelector(
  selectHomePagePageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectHomePagePageDomain(),
  (substate) => substate.get('error')
);

const makeSelectArtistList = () => createSelector(
  selectHomePagePageDomain(),
  (substate) => substate.get('artistList')
);


export {
  makeSelectLoading,
  makeSelectError,
  makeSelectArtistList,
};
