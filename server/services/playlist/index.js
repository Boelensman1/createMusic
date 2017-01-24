const hooks = require('./hooks');

class Service {
  constructor(mpc) {
    this.mpc = mpc;
  }

  find(params) {
    return this.mpc.storedPlaylists.listPlaylists();
  }

  get(id, params) {
    if (id === 'current') {
      return this.mpc.currentPlaylist.playlistInfo()
        .then((r) => ({current: r}));
    } else {
      // empty response -> 404
      return this.mpc.storedPlaylists.listPlaylistInfo(id).catch(() => undefined)
    }
  }
}

module.exports = function () {
  const app = this;
  const mpc = app.get('mpc');

  // Initialize our service with any options it requires
  app.use('/playlists', new Service(mpc));

  // Get our initialize service to that we can bind hooks
  const playlistService = app.service('/playlists');

  // Set up our before hooks
  playlistService.before(hooks.before);

  // Set up our after hooks
  playlistService.after(hooks.after);
};

module.exports.Service = Service;
