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
import { makeSelectActivePlaylistContents, makeSelectLoading, makeSelectError } from './selectors';
import messages from './messages';
import { loadActivePlayList } from './actions';

import NowPlayingList from './NowPlayingList';

export class NowPlayingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getNowPlaying();
  }

  render() {
    const { loading, activePlaylistContents, error } = this.props;

    return (
      <div>
        <Helmet
          title="NowPlayingPage"
          meta={[
            { name: 'description', content: 'Description of NowPlayingPage' },
          ]}
        />
        <NowPlayingList loading={loading} activePlaylistContents={activePlaylistContents} error={error} />
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

NowPlayingPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  activePlaylistContents: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  getNowPlaying: React.PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activePlaylistContents: makeSelectActivePlaylistContents(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNowPlaying: () => dispatch(loadActivePlayList()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingPage);
