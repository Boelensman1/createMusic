import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';

import { feathersServices } from './feathers';

export default {
  routing: routerReducer, // reducers required by react-router-redux
  playlists: feathersServices.playlists.reducer,
  artists: feathersServices.artists.reducer,
  form: reduxFormReducer, // reducers required by redux-form
};
