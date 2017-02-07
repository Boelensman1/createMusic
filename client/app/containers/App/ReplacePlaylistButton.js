/*
 * Play pause button
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import replacePlaylistIcon from './icons/replacePlaylist.svg';

import { sendReplacePlaylist } from './actions';

const ReplacePlaylistButtonDiv = styled.div`
  padding-top: 0.1em;
  width: 3em;
  margin-left: 1em;
`;

export class ReplacePlaylistButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sendReplacePlaylist: React.PropTypes.func,
    album: React.PropTypes.string,
    albumArtist: React.PropTypes.string,
  };

  constructor(props) {
    super(props);

    const { album, albumArtist } = this.props;

    this.replacePlaylist = this.props.sendReplacePlaylist.bind(this, album, albumArtist);
  }

  render() {
    return (
      <ReplacePlaylistButtonDiv onClick={this.replacePlaylist}>
        <img alt="Play This" src={replacePlaylistIcon} />
      </ReplacePlaylistButtonDiv>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    sendReplacePlaylist: (album, albumArtist) =>
      dispatch(sendReplacePlaylist(album, albumArtist)),
  };
}


// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(ReplacePlaylistButton);
