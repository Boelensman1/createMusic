const hooks = require('./hooks');

class Service {
  constructor(mpc) {
    this.mpc = mpc;
  }

  find(params) {
    return this.mpc.database.list('AlbumArtist').then(r => [...r][0][1]);
  }

  get(id, params) {
    return this.mpc.database.list('Album', [['AlbumArtist', id]])
      .then(r => [...r][0][1]);
  }
}

module.exports = function() {
  const app = this;
  const mpc = app.get('mpc');

  // Initialize our service with any options it requires
  app.use('/artists', new Service(mpc));

  // Get our initialize service to that we can bind hooks
  const artistService = app.service('/artists');

  // Set up our before hooks
  artistService.before(hooks.before);

  // Set up our after hooks
  artistService.after(hooks.after);
};

module.exports.Service = Service;
