/*
 * Play pause button
 */

import React from 'react';
import { connect } from 'react-redux';

import { sendPlaybackCommand } from './actions';

export class PlayPauseButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    const { sendPlaybackCommand } = props;
    this.play = sendPlaybackCommand.bind(this, 'play');
    this.pause = sendPlaybackCommand.bind(this, 'pause');
  }
  render() {
    return (
      <button onClick={this.pause}>play</button>
    );
  }

  static propTypes = {
    sendPlaybackCommand: React.PropTypes.func.isRequired,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    sendPlaybackCommand: (command) => dispatch(sendPlaybackCommand(command)),
  };
}


// const mapStateToProps = () => ({});

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(PlayPauseButton);
