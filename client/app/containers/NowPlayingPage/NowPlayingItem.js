import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { makeSelectNowPlayingId } from 'containers/App/selectors';

const Item = styled.li`
  height: 3.6em;
`;

const Title = styled.div`
  font-size: 1.3em;
  ${(props) => props.nowPlaying ? 'color: red' : ''}
`;

const Artist = styled.div`
  font-size: .7em;
  color: #AAAAAA;
`;

const AlbumArt = styled.img`
  height: 3.2em;
  margin: .2em;
  float: left;
  margin-right: 1em;
`;

// eslint-disable-next-line react/prefer-stateless-function
export class NowPlayingItem extends React.PureComponent {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    play: React.PropTypes.func.isRequired,
    nowPlayingId: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
  }

  shouldComponentUpdate(nextProps) {
    const { item, nowPlayingId } = this.props;
    const { item: newItem, nowPlayingId: newNowPlayingId } = nextProps;

    return (item !== newItem || item.id === nowPlayingId || newItem.id === newNowPlayingId);
  }

  render() {
    const { item, nowPlayingId, play } = this.props;
    return (
      <Item onClick={() => play(item.id)}>
        <AlbumArt src={item.albumArt} />
        <Title nowPlaying={nowPlayingId === item.id}>{item.title}</Title>
        <Artist>{item.artist}</Artist>
      </Item>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  nowPlayingId: makeSelectNowPlayingId(),
});

export default connect(mapStateToProps)(NowPlayingItem);
