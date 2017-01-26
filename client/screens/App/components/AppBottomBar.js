import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const artistsIcon = <IconLocationOn />;
const nowPlayingIcon = <IconLocationOn />;

export const AppBottomBar = ({ screen }) => (
  <Paper zDepth={2}>
    <BottomNavigation selectedIndex={0} >
      <BottomNavigationItem label='Artists' icon={artistsIcon} />
      <BottomNavigationItem label='Now Playing' icon={nowPlayingIcon} />
    </BottomNavigation>
  </Paper>
);

AppBottomBar.propTypes = {
  screen: PropTypes.string.isRequired,
};


export default AppBottomBar;
