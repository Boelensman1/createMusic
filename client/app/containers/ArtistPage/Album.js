import React from 'react';

import { Link } from 'react-router';

import styled from 'styled-components';

const AlbumLi = styled.li`
  height: 3.6em;
  a {
    color: white;
    }
`;

const AlbumArt = styled.img`
  height: 3.2em;
  margin: .2em;
  float: left;
  margin-right: 1em;
`;

// function Album({ album: { name } }) {
// <Link to={`/album/${name}`}>{name}</Link>
function Album({ album: { name, albumArt, pathArtist, pathAlbum } }) {
  return (
    <AlbumLi>
      <AlbumArt src={albumArt} />
      <Link to={`/artist/${pathArtist}/albums/${name}`}>{name}</Link>
    </AlbumLi>
  );
}

Album.propTypes = {
  album: React.PropTypes.object,
};

export default Album;
