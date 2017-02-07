import React from 'react';
import styled from 'styled-components';

import ReplacePlaylistButton from 'containers/App/ReplacePlaylistButton';

const Title = styled.h1`
  color: white;
  margin: 0;
  line-height: 0.8em;
`;

const AlbumArt = styled.img`
  height: 10rem;
  margin-right: 1rem;
`;

const AlbumTopBarDiv = styled.div`
  display: flex;
  align-items: flex-end;
`;

function AlbumTopBar({ firstSong: { album, albumArt, albumArtist } }) {
  return (
    <AlbumTopBarDiv>
      <AlbumArt src={albumArt} />
      <Title>{album}</Title>
      <ReplacePlaylistButton album={album} albumArtist={albumArtist} />
    </AlbumTopBarDiv>
  );
}

AlbumTopBar.propTypes = {
  firstSong: React.PropTypes.object.isRequired,
};

export default AlbumTopBar;
