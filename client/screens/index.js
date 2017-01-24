
import React, { PropTypes } from 'react';

import AppNavBar from './components/AppNavBar';
import AppBottomBar from './components/AppBottomBar';

const AppWrapper = ({location: {pathname}, children}) => (
  <div style={{ display: 'flex', flexFlow: 'column', height: '100%' }}>
    <div style={{ flex: '0 1 auto' }}>
      <AppNavBar pathname={pathname} />
    </div>
    <div style={{ flex: '1 1 auto', overflow: 'auto', overflowX: 'hidden' }}>
      {children}
    </div>
    <div style={{ flex: '0 1 40px' }}>
      <AppBottomBar pathname={pathname}/>
    </div>
  </div>
)

AppWrapper.propTypes = {
  children: PropTypes.any,
};

export default AppWrapper;
