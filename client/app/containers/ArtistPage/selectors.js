/**
 * The homepage state selectors
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the nowPlayingPage state domain
 */
const selectArtistListPageDomain = () => (state) => state.get('artistPage');

const makeSelectLoading = () => createSelector(
  selectArtistListPageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectArtistListPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectArtistAlbumList = () => createSelector(
  selectArtistListPageDomain(),
  (substate) => substate.get('artistAlbumList')
);


export {
  makeSelectLoading,
  makeSelectError,
  makeSelectArtistAlbumList,
};
