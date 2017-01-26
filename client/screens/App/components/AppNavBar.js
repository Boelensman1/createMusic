import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
// eslint-disable-next-line no-unused-vars
import FlatButton from 'material-ui/FlatButton';

import MessageBar from '../../components/MessageBar';

export const AppNavBar = ({ label, screen, message }) => (
  <div>
    <AppBar
      title={<span>{label}</span>}
      iconElementLeft={<div />}
      zDepth={2}
    />
    <MessageBar message={message} />
  </div>
);

AppNavBar.propTypes = {
  label: PropTypes.string.isRequired, // Nav bar label
  // nav bar is for this patch, determines options shown
  screen: PropTypes.string.isRequired,
  message: PropTypes.string,
};


export default AppNavBar;
