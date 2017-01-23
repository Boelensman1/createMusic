'use strict';

const MPC = require('mpc-js').MPC;

const mpc = new MPC();

mpc.connectTCP('mainpc', 6600);

const hooks = require('./hooks');

class Service {
  constructor(options) {
    this.options = options || {};
  }

  find(params) {
    return mpc.database.list('AlbumArtist').then(r => [...r][0][1]);
  }

  get(id, params) {
    return mpc.database.list('Album', [['AlbumArtist', id]])
      .then(r => [...r][0][1]);
  }
}

module.exports = function() {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/artists', new Service());

  // Get our initialize service to that we can bind hooks
  const artistService = app.service('/artists');

  // Set up our before hooks
  artistService.before(hooks.before);

  // Set up our after hooks
  artistService.after(hooks.after);
};

module.exports.Service = Service;
