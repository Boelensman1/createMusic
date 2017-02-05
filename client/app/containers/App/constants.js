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

export const SEND_PLAYBACK_COMMAND = 'playMusic/App/SEND_PLAYBACK_COMMAND';

export const LOAD_NOWPLAYING = 'playMusic/App/LOAD_NOWPLAYING';
export const LOAD_NOWPLAYING_SUCCESS = 'playMusic/App/LOAD_NOWPLAYING_SUCCESS';
export const LOAD_NOWPLAYING_ERROR = 'playMusic/App/LOAD_NOWPLAYING_ERROR';

export const LOAD_ACTIVE_PLAYLIST = 'playMusic/App/LOAD_ACTIVE_PLAYLIST';
export const LOAD_ACTIVE_PLAYLIST_SUCCESS = 'playMusic/App/LOAD_ACTIVE_PLAYLIST_SUCCESS';
export const LOAD_ACTIVE_PLAYLIST_ERROR = 'playMusic/App/LOAD_ACTIVE_PLAYLIST_ERROR';
