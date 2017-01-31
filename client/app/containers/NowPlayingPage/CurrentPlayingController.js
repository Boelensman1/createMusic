import React from 'react';
import styled from 'styled-components';

import PlayPauseButton from 'containers/App/PlayPauseButton';

import ProgressBar from './ProgressBar';

const CurrentPlayingControllerDiv = styled.div`
  position: relative;
`;

const ControllerContainer = styled.div`
  position: absolute;
  bottom: 0px;
  height: 10%;
  width: 100%;
  /* RGBa with 0.6 opacity */
  background-color: rgba(0, 0, 0, 0.6);
`;

const BackgroundImg = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  padding-top: 100%;
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class CurrentPlayingController extends React.PureComponent {
  static propTypes = {
    nowPlaying: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool,
    ]),
  }

  render() {
    const { nowPlaying, isPlaying } = this.props;

    return (
      <CurrentPlayingControllerDiv>
        <BackgroundImg src={nowPlaying.albumArt} />
        <ControllerContainer >
          {nowPlaying.title} - {nowPlaying.artist}
          <PlayPauseButton />
          <ProgressBar />
        </ControllerContainer>
      </CurrentPlayingControllerDiv>
    );
  }
}
