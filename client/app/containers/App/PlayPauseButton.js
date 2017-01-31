/*
 * Play pause button
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FontAwesome from 'react-fontawesome';

import { makeSelectIsPlaying } from './selectors';
import { sendPlaybackCommand } from './actions';

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
      <button onClick={isPlaying ? this.pause : this.play}>
        <FontAwesome name={isPlaying ? 'pause-circle-o' : 'play-circle'} size="2x" /> :
      </button>
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
