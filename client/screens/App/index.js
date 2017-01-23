import React from 'react';
import AppNavBar from './components/AppNavBar';

import ArtistList from '../ArtistList';

export default () => (
  <div>
    <AppNavBar label="App" screen="app/main" />
    <ArtistList />
  </div>
);
