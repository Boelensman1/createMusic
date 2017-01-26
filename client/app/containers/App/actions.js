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
