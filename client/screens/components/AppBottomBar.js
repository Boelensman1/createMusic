import React, { PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import { browserHistory } from 'react-router'

// Go to /some/path.

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const artistsIcon = <IconLocationOn />;
const nowPlayingIcon = <IconLocationOn />;

export const AppBottomBar = ({ pathname }) => {
  let selectedIndex;
  switch(pathname) {
    case '/app':
      selectedIndex = 0;
      break;
    case '/nowPlaying':
      selectedIndex = 1;
      break;
  }
  return (
    <Paper zDepth={2}>
      <BottomNavigation selectedIndex={selectedIndex} >
        <BottomNavigationItem
          label='Artists'
          onTouchTap={() => browserHistory.push('/app')}
          icon={artistsIcon}
        />
        <BottomNavigationItem
          label='Now Playing'
          onTouchTap={() => browserHistory.push('/nowPlaying')}
          icon={nowPlayingIcon}
        />
      </BottomNavigation>
    </Paper>
  )
};

AppBottomBar.propTypes = {
  pathname: PropTypes.string.isRequired,
};


export default AppBottomBar;
