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

function NowPlayingItem({ item }) {
  return (
    <Item>
      <AlbumArt src={item.albumArt} />
      <Title>{item.title}</Title>
      <Artist>{item.artist}</Artist>
    </Item>
  );
}

NowPlayingItem.propTypes = {
  item: React.PropTypes.object,
};

export default NowPlayingItem;
