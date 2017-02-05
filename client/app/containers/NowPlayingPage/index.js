/*
 *
 * NowPlayingPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectLoading,
  makeSelectError,
  makeSelectNowPlaying,
} from 'containers/App/selectors';

import CurrentPlayingController from './CurrentPlayingController';

// import messages from './messages';

import NowPlayingList from './NowPlayingList';

export class NowPlayingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    nowPlaying: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    isPlaying: React.PropTypes.bool,
  }

  render() {
    const { loading, nowPlaying, isPlaying, error } = this.props;

    return (
      <div>
        <Helmet
          title="NowPlayingPage"
          meta={[
            { name: 'description', content: 'Description of NowPlayingPage' },
          ]}
        />
        <CurrentPlayingController nowPlaying={nowPlaying} isPlaying={isPlaying} />
        <NowPlayingList
          loading={loading}
          error={error}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nowPlaying: makeSelectNowPlaying(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export default connect(mapStateToProps)(NowPlayingPage);
