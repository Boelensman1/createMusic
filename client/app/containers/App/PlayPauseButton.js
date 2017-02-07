/*
 * Play pause button
 */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import pauseIcon from './icons/pause.svg';
import playIcon from './icons/play.svg';

import { makeSelectIsPlaying } from './selectors';
import { sendPlaybackCommand } from './actions';

const PlayButton = styled.div`
  padding-top: 0.1em;
  width: 3em;
  margin-left: 1em;
`;

export class PlayPauseButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sendPlaybackCommand: React.PropTypes.func,
    isPlaying: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.play = this.props.sendPlaybackCommand.bind(this, 'play');
    this.pause = this.props.sendPlaybackCommand.bind(this, 'pause');
  }

  render() {
    const { isPlaying } = this.props;
    return (
      <PlayButton onClick={isPlaying ? this.pause : this.play}>
        <img
          alt={isPlaying ? 'pause' : 'play'}
          src={isPlaying ? pauseIcon : playIcon}
        />
      </PlayButton>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    sendPlaybackCommand: (command) => dispatch(sendPlaybackCommand(command)),
  };
}


const mapStateToProps = createStructuredSelector({
  isPlaying: makeSelectIsPlaying(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);
