/* eslint-disable no-underscore-dangle */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { makeSelectIsPlaying, makeSelectTimingInfo } from 'containers/App/selectors';

import PlayPauseButton from 'containers/App/PlayPauseButton';

import { sendPlaybackCommand } from 'containers/App/actions';

const PlayPauseButtonContainer = styled.span`
  height: 20px;
`;

const ProgressBarDiv = styled.div`
  display: flex;
  align-items: center;
`;

const TimingSpan = styled.span`
  color: white;
`;
const Meter = styled.div`
  height: 5px;
  background: #555;

  span {
    pointer-events: none;
    display: block;
    height: 100%;
    background-color: red;
    overflow: hidden;
  }
`;
const MeterContainer = styled.div`
  flex: 1;
  padding-left: 1em;
  padding-right: 1em;
`;

const pad = (n) => {
  const width = 2;
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}
const toTime = (seconds) => (`${pad(Math.floor(seconds/60))}:${pad(Math.round(seconds % 60))}`)

export class ProgressBar extends React.Component {
  static propTypes = {
    initialElapsed: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    duration: React.PropTypes.number,
    sendSeekCommand: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = ({ elapsed: 0, startCountDate: new Date() });
    this._scrub = this.scrub.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { elapsed } = nextProps.durationAndElapsed;
    this.setState({ elapsed, startCountDate: new Date() });
    if (nextProps.isPlaying) {
      this.startCounting();
    } else {
      this.stopCounting();
    }
  }

  componentWillUnmount() {
    this.stopCounting();
  }

  startCounting() {
    if (!this._timer) {
      this._timer = setInterval(this.doCount.bind(this), 1000);
    }
  }

  stopCounting() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  doCount() {
    const { startCountDate } = this.state;
    const initialElapsed = this.props.durationAndElapsed.elapsed;
    const secondsDifference = (new Date().getTime() - startCountDate.getTime()) / 1000;
    this.setState({ elapsed: initialElapsed + secondsDifference });
  }

  scrub(e) {
    const width = e.target.clientWidth;
    const clickLocation = e.nativeEvent.offsetX;

    const { duration } = this.props.durationAndElapsed;

    const newProgress = (clickLocation / width) * duration;
    this.props.sendSeekCommand(newProgress);
  }

  render() {
    const elapsed = this.state.elapsed;
    const { duration } = this.props.durationAndElapsed;

    const progress = (elapsed / duration) * 100;
    return (
      <ProgressBarDiv>
        <TimingSpan>{toTime(elapsed)}</TimingSpan>
          <MeterContainer>
            <Meter onClick={this._scrub} ref={(div) => { this.clickTarget = div; }} >
              <span style={{ width: `${progress}%` }}></span>
            </Meter>
          </MeterContainer>
        <TimingSpan>{toTime(duration)}</TimingSpan>
        <PlayPauseButtonContainer>
          <PlayPauseButton />
        </PlayPauseButtonContainer>
      </ProgressBarDiv>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    sendSeekCommand: (time) => dispatch(sendPlaybackCommand('seekInCurrent', {time: time})),
  };
}

const mapStateToProps = createStructuredSelector({
  isPlaying: makeSelectIsPlaying(),
  durationAndElapsed: makeSelectTimingInfo(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
