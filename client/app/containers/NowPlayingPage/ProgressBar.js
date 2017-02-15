/* eslint-disable no-underscore-dangle */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { makeSelectIsPlaying, makeSelectTimingInfo } from 'containers/App/selectors';

import PlayPauseButton from 'containers/App/PlayPauseButton';

import { sendPlaybackCommand, loadNowPlaying } from 'containers/App/actions';

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
  &.transition {
    span {
      transition: width 1s;
      transition-timing-function: linear;
    }
  }

  &.ease{
    span {
      transition: width 0.6s;
      transition-timing-function: ease-out;
    }
  }
`;
const MeterContainer = styled.div`
  flex: 1;
  padding-left: 1em;
  padding-right: 1em;
`;

const pad = (number) => {
  const width = 2;
  const n = String(number);
  return n.length >= width ? n : new Array(width - (n.length - 1)).join('0') + n;
};

const toTime = (seconds) => (`${pad(Math.floor(seconds / 60))}:${pad(Math.floor(seconds % 60))}`);

const browserPrefixes = ['moz', 'ms', 'o', 'webkit'];

// get the correct attribute name
function getHiddenPropertyName(prefix) {
  return (prefix ? `${prefix}Hidden` : 'hidden');
}

// get the correct event name
function getVisibilityEvent(prefix) {
  return `${prefix || ''}visibilitychange`;
}

// get current browser vendor prefix
function getBrowserPrefix() {
  for (let i = 0; i < browserPrefixes.length; i += 1) {
    if (getHiddenPropertyName(browserPrefixes[i]) in document) {
      // return vendor prefix
      return browserPrefixes[i];
    }
  }

  // no vendor prefix needed
  return null;
}


export class ProgressBar extends React.Component {
  static propTypes = {
    initialElapsed: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    sendSeekCommand: React.PropTypes.func,
    isPlaying: React.PropTypes.bool,
    reLoadNowPlaying: React.PropTypes.func,
    durationAndElapsed: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  };

  constructor(props) {
    super(props);
    this.state = ({ elapsed: 0, startCountDate: new Date(), newSong: true });
    this._scrub = this.scrub.bind(this);

    const { durationAndElapsed: { elapsed }, isPlaying } = props;
    this.state = { elapsed, startCountDate: new Date() };
    this.startOrStopCounting(isPlaying);

    // bind and handle events
    const browserPrefix = getBrowserPrefix();
    this._onVisibilityChange = this.onVisibilityChange.bind(this);
    document.addEventListener(getVisibilityEvent(browserPrefix), this._onVisibilityChange, false);
  }

  componentWillReceiveProps(nextProps) {
    const { durationAndElapsed: { elapsed }, isPlaying } = nextProps;
    this.setState({ elapsed, newSong: elapsed < 1, ease: elapsed >= 1, startCountDate: new Date() });

    this.stopCounting();
    this.startOrStopCounting(isPlaying);
  }

  componentWillUnmount() {
    this.stopCounting();
    window.removeEventListener('visibilitychange', this._onVisibilityChange);
  }

  onVisibilityChange() {
    if (!document.hidden) {
      const { reLoadNowPlaying } = this.props;
      // get status, as it might have become wrong
      console.log('loading...');
      reLoadNowPlaying();
    }
  }

  startOrStopCounting(isPlaying) {
    if (isPlaying) {
      this.startCounting();
    } else {
      this.stopCounting();
    }
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
    this.setState({ elapsed: initialElapsed + secondsDifference, newSong: false, ease: false });
  }

  scrub(e) {
    const width = e.target.clientWidth;
    const clickLocation = e.nativeEvent.offsetX;

    const { duration } = this.props.durationAndElapsed;

    const newProgress = (clickLocation / width) * duration;
    this.props.sendSeekCommand(newProgress);
  }

  render() {
    const { elapsed, newSong, ease } = this.state;
    const { duration } = this.props.durationAndElapsed;

    const progress = (elapsed / duration) * 100;
    return (
      <ProgressBarDiv>
        <TimingSpan>{toTime(elapsed)}</TimingSpan>
        <MeterContainer>
          <Meter onClick={this._scrub} ref={(div) => { this.clickTarget = div; }} className={!newSong && (ease ? 'ease' : 'transition')}>
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
    sendSeekCommand: (time) => (
      dispatch(sendPlaybackCommand('seekInCurrent', { time }))
    ),
    reLoadNowPlaying: () => dispatch(loadNowPlaying()),
  };
}

const mapStateToProps = createStructuredSelector({
  isPlaying: makeSelectIsPlaying(),
  durationAndElapsed: makeSelectTimingInfo(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);
