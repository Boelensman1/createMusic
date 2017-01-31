import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';

import {
  /* makeSelectLoading,
  makeSelectError, */
  makeSelectActivePlaylistContents,
} from 'containers/App/selectors';

import { sendPlaybackCommand } from 'containers/App/actions';

import NowPlayingItem from './NowPlayingItem';

const UL = styled.ul`
  list-style: none;
  padding-left: 0;
`;

// eslint-disable-next-line react/prefer-stateless-function
export class NowPlayingList extends React.PureComponent {
  static propTypes = {
    loading: React.PropTypes.bool,
    error: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
    activePlaylistContents: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    playSongById: React.PropTypes.func,
  }

  render() {
    const { loading, error, activePlaylistContents, playSongById } = this.props;
    return (
      <UL>
        {error === false ?
            (!loading && activePlaylistContents) && activePlaylistContents.map((item, i) => (
              <NowPlayingItem
                key={i}
                item={item}
                play={playSongById}
              />
            )) :
                <span>{error.toString()}</span>}
      </UL>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    playSongById: (songId) => dispatch(sendPlaybackCommand('playId', { songId })),
  };
}

const mapStateToProps = createStructuredSelector({
  activePlaylistContents: makeSelectActivePlaylistContents(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingList);
