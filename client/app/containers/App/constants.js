/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';

export const LOAD_ARTISTLIST = 'playMusic/App/LOAD_ARTISTLIST';
export const LOAD_ARTISTLIST_SUCCESS = 'playMusic/App/LOAD_ARTISTLIST_SUCCESS';
export const LOAD_ARTISTLIST_ERROR = 'playMusic/App/LOAD_ARTISTLIST_ERROR';

export const SEND_PLAYBACK_COMMAND = 'playMusic/App/SEND_PLAYBACK_COMMAND';
