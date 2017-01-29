/*
 * Play pause button
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectPlayState } from './selectors';
import { sendPlaybackCommand } from './actions';

export class PlayPauseButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    sendPlaybackCommand: React.PropTypes.func,
    playState: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
  };

  constructor(props) {
    super(props);

    this.play = this.props.sendPlaybackCommand.bind(this, 'play');
    this.pause = this.props.sendPlaybackCommand.bind(this, 'pause');
  }
  render() {
    const { playState } = this.props;
    return (
      <button onClick={playState === 'play' ? this.pause : this.play}>
        {playState === 'play' ? 'pause' : 'play'}
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
  playState: makeSelectPlayState(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(PlayPauseButton);
