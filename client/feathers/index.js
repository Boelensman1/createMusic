
/* global io, window */

import feathers from 'feathers-client';
import reduxifyServices, {
  getServicesStatus,
} from 'feathers-reduxify-services';

import {
  mapServicePathsToNames,
  prioritizedListServices,
} from './feathersServices';

const socket = io();

// Configure feathers-client
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks());
export default app;

// Configure services
// ...

// Reduxify feathers services
export const feathersServices = reduxifyServices(app, mapServicePathsToNames);

// Convenience method to get status of feathers services,
// incl feathers-authentication
export const getFeathersStatus =
  (servicesRootState, names = prioritizedListServices) =>
    getServicesStatus(servicesRootState, names);
