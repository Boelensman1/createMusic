import makeDebug from 'debug';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import configureStore from './store';
 // next line does feathers init
import { feathersServices } from './feathers';

import { configLoad } from './utils/config';
import { initLogger, logger } from './utils/loggerRedux';
import './utils/react-tap-event';

// __processEnvNODE_ENV__ is replaced during the webpack build process
// eslint-disable-next-line no-undef, camelcase
const nodeEnv = __processEnvNODE_ENV__;
const debug = makeDebug('index');

debug(`client starting. Built for ${nodeEnv} env.`);
// eslint-disable-next-line no-console
console.log(`..This bundle was built for the ${nodeEnv} env.`);

// Initialize Redux
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Handle uncaught exceptions.
if (nodeEnv === 'production') {
  setupOnUncaughtExceptions();
}

// Get client config
configLoad(store, feathersServices)
  .then(clientConfig => {
    // Setup client logger first so we can log asap
    initLogger(store.dispatch, feathersServices.logs);
    logger('info', 'Agent connected'); // todo You may want to remove this

    // Setup React Router which starts up the rest of the app.
    // A hack. Lemme know if you have a better idea.
    // eslint-disable-next-line global-require
    const router = require('./router').default;

    router(store, history);
  });
  // you cannot place a catch here because of the require inside then()

// Handle uncaught exceptions
    // eslint-disable-next-line no-unused-vars
function setupOnUncaughtExceptions() {
  window.addEventListener('error', (e) => {
    e.preventDefault();
    const error = e.error;
    // eslint-disable-next-line no-console
    console.error(
        'onUncaughtExceptions caught error:\n', error
    );

    // eslint-disable-next-line no-unused-vars
    const message = error.message || '';
    // eslint-disable-next-line no-unused-vars
    const stack = (error.stack || '').split('\n');

    // We cannot depend on the logger running properly.
    // Try to log to server directly.
    if (store && store.dispatch && feathersServices && feathersServices.logs) {
      store.dispatch(feathersServices.logs.create({
        level: 'error',
        msg: 'Uncaught exception',
        error: { message, stack, deviceId: localStorage.deviceId },
      }))
        .catch(err => console.log( // eslint-disable-line no-console
          'onUncaughtExceptions error while logging:\n', err
        ));
    }
  });
}
