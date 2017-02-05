/*
 * Homepage actions
 */

import {
  LOAD_ARTISTLIST,
  LOAD_ARTISTLIST_SUCCESS,
  LOAD_ARTISTLIST_ERROR,
} from './constants';

/**
 * Load the artistlist, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTISTLIST
 */
export function loadArtistList() {
  return {
    type: LOAD_ARTISTLIST,
  };
}

/**
 * Dispatched when the artistList is loaded by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of LOAD_ARTISTLIST_SUCCESS passing the artistList
 */
export function artistListLoaded(artistList) {
  return {
    type: LOAD_ARTISTLIST_SUCCESS,
    artistList,
  };
}

/**
 * Dispatched when loading the artistList fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ARTISTLIST_ERROR passing the error
 */
export function artistListLoadingError(error) {
  return {
    type: LOAD_ARTISTLIST_ERROR,
    error,
  };
}
