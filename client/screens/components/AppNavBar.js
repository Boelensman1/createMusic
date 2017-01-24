import React, { PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
// eslint-disable-next-line no-unused-vars
import FlatButton from 'material-ui/FlatButton';

import MessageBar from './MessageBar';

export const AppNavBar = ({ pathname, message }) => {
  const label = pathname;
  return (
    <div>
      <AppBar
        title={<span>{label}</span>}
        iconElementLeft={<div />}
        zDepth={2}
      />
      <MessageBar message={message} />
    </div>
  )
};

AppNavBar.propTypes = {
  pathname: PropTypes.string.isRequired,
  message: PropTypes.string,
};


export default AppNavBar;
