import React from 'react';
import styled from 'styled-components';

const Item = styled.li`
  height: 3.6em;
`;

const Title = styled.div`
  font-size: 1.3em;
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

function NowPlayingItem({ item, nowPlaying }) {
  return (
    <Item>
      <AlbumArt src={item.albumArt} />
      <Title nowPlaying={nowPlaying}>{item.title}</Title>
      <Artist>{item.artist}</Artist>
    </Item>
  );
}

NowPlayingItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  nowPlaying: React.PropTypes.bool.isRequired,
};

export default NowPlayingItem;
