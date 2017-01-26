'use strict';

const addAlbumArt = require('./addAlbumArt');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [addAlbumArt()],
  create: [],
  update: [],
  patch: [],
  remove: []
};
