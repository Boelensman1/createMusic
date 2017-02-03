import React from 'react';
import styled from 'styled-components';

import ProgressBar from './ProgressBar';

const CurrentPlayingControllerDiv = styled.div`
  position: relative;
  @media (min-width: 500px) {
    display: flex;
    align-items: flex-end;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const ControllerContainer = styled.div`
  @media (max-width: 500px) {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.6);
  }
  bottom: 0px;
  width: 100%;
  padding-left: 0.5em;
  padding-right: 0.5em;
  /* RGBa with 0.6 opacity */
`;

const BackgroundImg = styled.div`
  background-image: url("${(props) => props.src}");
  background-size: cover;
  padding-top: 100%;
  @media (min-width: 500px) {
    padding-top: 0%;
    width: 7rem;
    height: 7rem;
  }
`;

const TitleInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.span`
  font-size: 1.1em;
  margin-right: 0.5em;
`;

const Artist = styled.span`
  font-size: 1.1em;
  color: #AAAAAA;
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
    const { nowPlaying } = this.props;

    return (
      <CurrentPlayingControllerDiv>
        <BackgroundImg src={nowPlaying.albumArt} />
        <ControllerContainer >
          <TitleInfo>
            <Title>{nowPlaying.title}</Title><Artist>{nowPlaying.artist}</Artist>
          </TitleInfo>
          <ProgressBar />
        </ControllerContainer>
      </CurrentPlayingControllerDiv>
    );
  }
}
