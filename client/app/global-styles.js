import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background: linear-gradient( 45deg, #1b1d1e 0%, #1b1d1e 60%, #323435 60.1%, #323435 99.9%,#1b1d1e 100% );
    color: #ebebeb;
    height: 100%;
    width: 100%;
    background-color: #1b1d1e;
    background-repeat: no-repeat;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
`;
