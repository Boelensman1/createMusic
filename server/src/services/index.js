'use strict';

const playback = require('./playback');
const artist = require('./artist');
const playlist = require('./playlist');

const MPC = require('mpc-js').MPC;

const mpc = new MPC();

mpc.connectTCP('mainpc', 6600);


module.exports = function() {
  const app = this;

  const mpc = new MPC();
  mpc.connectTCP('mainpc', 6600);

  app.set('mpc', mpc);


  app.configure(artist);
  app.configure(playlist);
  app.configure(playback);
};
