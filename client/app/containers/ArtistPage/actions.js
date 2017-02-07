/*
 * Homepage actions
 */

import {
  LOAD_ARTISTALBUMLIST,
  LOAD_ARTISTALBUMLIST_SUCCESS,
  LOAD_ARTISTALBUMLIST_ERROR,
} from './constants';

/**
 * Load the artistlist, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTISTALBUMLIST
 */
export function loadArtistAlbumList(artistName) {
  return {
    type: LOAD_ARTISTALBUMLIST,
    payload: {
      artistName: encodeURIComponent(artistName),
    },
  };
}

/**
 * Dispatched when the artistAlbumList is loaded by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of LOAD_ARTISTALBUMLIST_SUCCESS passing the artistAlbumList
 */
export function artistAlbumListLoaded(artistAlbumList) {
  return {
    type: LOAD_ARTISTALBUMLIST_SUCCESS,
    artistAlbumList,
  };
}

/**
 * Dispatched when loading the artistAlbumList fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ARTISTALBUMLIST_ERROR passing the error
 */
export function artistAlbumListLoadingError(error) {
  return {
    type: LOAD_ARTISTALBUMLIST_ERROR,
    error,
  };
}
