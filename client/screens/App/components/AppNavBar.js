
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
// eslint-disable-next-line no-unused-vars
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import MessageBar from '../../components/MessageBar';

export const AppNavBar = ({ label, screen, message }) => (
  <div>
    <AppBar
      title={<span>{label}</span>}
      iconElementLeft={<div />}
      iconElementRight={makeBarButtons(screen)}
    />
    <MessageBar message={message} />
  </div>
);

AppNavBar.propTypes = {
  label: PropTypes.string.isRequired, // Nav bar label
  // nav bar is for this patch, determines options shown
  screen: PropTypes.string.isRequired,
  username: PropTypes.any,
  message: PropTypes.string, //
};

const makeBarButtons = (screen) => {
  switch (screen) {
    case 'app/main':
      return (
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            containerElement={<Link to="/user/signin" />}
            primaryText="Sign out"
          />
          <MenuItem
            containerElement={<Link to="/user/profile" />}
            primaryText="User profile"
          />
        </IconMenu>
      );

    default: {
      return (
        <div />
      );
    }
  }
};

export default AppNavBar;
