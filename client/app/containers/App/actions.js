/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SEND_PLAYBACK_COMMAND,
  SEND_REPLACE_PLAYLIST,
  LOAD_NOWPLAYING,
  LOAD_NOWPLAYING_ERROR,
  LOAD_NOWPLAYING_SUCCESS,
  LOAD_ACTIVE_PLAYLIST,
  LOAD_ACTIVE_PLAYLIST_SUCCESS,
  LOAD_ACTIVE_PLAYLIST_ERROR,
} from './constants';

/**
 * Send a playback command, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTISTLIST
 */
export function sendPlaybackCommand(command, payload) {
  return {
    type: SEND_PLAYBACK_COMMAND,
    command,
    payload,
  };
}

/**
 * Send a replace playlist command, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ARTISTLIST
 */
export function sendReplacePlaylist(album, albumArtist) {
  return {
    type: SEND_REPLACE_PLAYLIST,
    album,
    albumArtist,
  };
}

/**
 * Load now playing
 *
 * @return {object} An action object with a type of LOAD_NOWPLAYING
 */
export function loadNowPlaying() {
  return {
    type: LOAD_NOWPLAYING,
  };
}

/**
 * Dispatched when the now playing data is loaded by the request saga
 *
 * @param  {array} repos The repository data
 *
 * @return {object}      An action object with a type of LOAD_NOWPLAYING_SUCCESS passing the data
 */
export function nowPlayingLoaded(nowPlayingData) {
  return {
    type: LOAD_NOWPLAYING_SUCCESS,
    nowPlayingData,
  };
}

/**
 * Dispatched when loading the nowplaying data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_NOWPLAYING_ERROR passing the error
 */
export function nowPlayingLoadingError(error) {
  return {
    type: LOAD_NOWPLAYING_ERROR,
    error,
  };
}

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
