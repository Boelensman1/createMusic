/**
 * The homepage state selectors
 */

import { createSelector } from 'reselect';

/**
 * Direct selector to the nowPlayingPage state domain
 */
const selectAlbumSongListPageDomain = () => (state) => state.get('albumPage');

const makeSelectLoading = () => createSelector(
  selectAlbumSongListPageDomain(),
  (substate) => substate.get('loading')
);

const makeSelectError = () => createSelector(
  selectAlbumSongListPageDomain(),
  (substate) => substate.get('error')
);

const makeSelectAlbumSongList = () => createSelector(
  selectAlbumSongListPageDomain(),
  (substate) => substate.get('albumSongList')
);


export {
  makeSelectLoading,
  makeSelectError,
  makeSelectAlbumSongList,
};
