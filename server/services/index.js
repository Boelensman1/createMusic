
/* eslint no-console: 0, no-param-reassign: 0 */

const debug = require('debug')('service:index');
const config = require('config');
const auth = require('feathers-authentication').hooks;

const tryHook = require('./hooks/tryHook');
const logger = require('../utils/loggerProduction');

const artist = require('./artist');

debug('Required');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(artist);

  // get client config file
  app.use('/config', {
    get() {
      return Promise.resolve(config.clientConfig);
    },
  });

  // create log entry
  app.use('/logs', {
    before: {
      create: [
        tryHook(auth.verifyToken()),
        tryHook(auth.populateUser()),
      ],
    },
    create({ level, msg, payload }, params) {
      if (!payload.tags) {
        payload.tags = 'client';
      }

      logger[level](msg, payload);

      // Note: Redux's action.payload will contain undefined instead of null
      return Promise.resolve(null);
    },
  });

  debug('Config complete');
};
