
/* eslint new-cap: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect } from 'react-router';
// import { replace } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { config } from './utils/config';

import AppWrapper from './screens';
import NowPlaying from './screens/NowPlaying';
import App from './screens/App';

// Routing
export default function (store, history) {
  ReactDOM.render(
    <MuiThemeProvider>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={AppWrapper}>
            <IndexRedirect to={config.client.defaultRoute} />
            <Route path={config.client.defaultRoute} component={App} />
            <Route path="/nowPlaying" component={NowPlaying} />
          </Route>
        </Router>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
  );
}

/* eslint-disable max-len */
/*
If you want to dynamically load code for infrequently used routes,
the following, an extract from another project, shows how with React-Router v2.x.x.

You would also have to uncomment lines in webpack.production.config.js dealing with the
user chunk.

<Route path="/" component={AppWrapper}>
  <IndexRedirect to="/songs/filter" />
  <Route path="user/signup" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserSignUp'
                   )}
  />
  <Route path="user/validateSignUpEmail/:token" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserValidateSignUpEmail'
                   )}
  />
  <Route path="user/signin" component={UserSignIn} />
  <Route path="user/sendForgotPwdEmail" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserSendForgotPwdEmail'
                   )}
  />
  <Route path="user/validateForgotPasswordEmail/:token" component={require(
                   'react-router-proxy?name=user!./screens/Users/UserValidateForgotPwdEmail'
                   )}
  />
  <Route path="user/profile" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserProfile'
                   ))}
  />
  <Route path="user/changePassword" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserChangePwd'
                   ))}
  />
  <Route path="user/changeEmail" component={UserIsAuthenticated(require(
                   'react-router-proxy?name=user!./screens/Users/UserChangeEmail'
                   ))}
  />
  <Route path="songs" component={UserIsAuthenticated(SongsWrapper)} >
    <Route path="filter" component={SongsFilter} />
    <Route path="add" component={SongAdd} />
    <Route path=":id" component={SongDetails} />
    <Route path="modify/:id" component={SongModify} />
  </Route>
</Route>
*/
/* eslint-enable */
