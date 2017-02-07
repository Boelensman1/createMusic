/*
 * Homepage actions
 */

import {
  LOAD_ALBUMSONGLIST,
  LOAD_ALBUMSONGLIST_SUCCESS,
  LOAD_ALBUMSONGLIST_ERROR,
} from './constants';

/**
 * Load the albumSongList, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ALBUMSONGLIST
 */
export function loadAlbumSongList(albumArtist, albumName) {
  return {
    type: LOAD_ALBUMSONGLIST,
    payload: {
      albumArtist: encodeURIComponent(albumArtist),
      albumName: encodeURIComponent(albumName),
    },
  };
}

/**
 * Dispatched when the albumSongList is loaded by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of LOAD_ALBUMSONGLIST_SUCCESS passing the albumSongList
 */
export function albumSongListLoaded(albumSongList) {
  return {
    type: LOAD_ALBUMSONGLIST_SUCCESS,
    albumSongList,
  };
}

/**
 * Dispatched when loading the albumSongList fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ALBUMSONGLIST_ERROR passing the error
 */
export function albumSongListLoadingError(error) {
  return {
    type: LOAD_ALBUMSONGLIST_ERROR,
    error,
  };
}
