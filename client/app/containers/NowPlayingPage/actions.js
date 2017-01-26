/*
 *
 * NowPlayingPage actions
 *
 */

import {
  LOAD_ACTIVE_PLAYLIST,
  LOAD_ACTIVE_PLAYLIST_SUCCESS,
  LOAD_ACTIVE_PLAYLIST_ERROR,
} from './constants';

/**
 * Load the active playlist, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ACTIVE_PLAYLIST
 */
export function loadActivePlayList() {
  return {
    type: LOAD_ACTIVE_PLAYLIST,
  };
}

/**
 * Dispatched when the artistList is loaded by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of LOAD_ACTIVE_PLAYLIST_SUCCESS passing the artistList
 */
export function activePlayListLoaded(activePlaylistContents) {
  return {
    type: LOAD_ACTIVE_PLAYLIST_SUCCESS,
    activePlaylistContents,
  };
}

/**
 * Dispatched when loading the active playlist fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ACTIVE_PLAYLIST_ERROR passing the error
 */
export function activePlayListLoadingError(error) {
  return {
    type: LOAD_ACTIVE_PLAYLIST_ERROR,
    error,
  };
}
