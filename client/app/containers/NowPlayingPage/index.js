/*
 *
 * NowPlayingPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import PlayPauseButton from 'containers/App/PlayPauseButton';

import { makeSelectNowPlayingId } from 'containers/App/selectors';

import {
  makeSelectActivePlaylistContents,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import messages from './messages';
import { loadActivePlayList } from './actions';

import NowPlayingList from './NowPlayingList';

export class NowPlayingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    nowPlayingId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
    activePlaylistContents: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    loadActivePlaylist: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadActivePlaylist();
  }

  render() {
    const { loading, activePlaylistContents, nowPlayingId, error } = this.props;

    return (
      <div>
        <Helmet
          title="NowPlayingPage"
          meta={[
            { name: 'description', content: 'Description of NowPlayingPage' },
          ]}
        />
        <PlayPauseButton />
        <NowPlayingList
          loading={loading}
          activePlaylistContents={activePlaylistContents}
          nowPlayingId={nowPlayingId}
          error={error}
        />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  activePlaylistContents: makeSelectActivePlaylistContents(),
  nowPlayingId: makeSelectNowPlayingId(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadActivePlaylist: () => dispatch(loadActivePlayList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingPage);
