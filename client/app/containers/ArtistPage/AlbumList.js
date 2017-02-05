import React from 'react';

import styled from 'styled-components';

import Album from './Album';

const AlbumListUl = styled.ul`
  list-style: none;
  padding-left: 0;
`;

function AlbumList({ loading, error, albumList }) {
  return (
    <AlbumListUl>
      {error === false ?
          (!loading && albumList) && albumList.map((album, i) => (
            <Album key={i} album={album} />
          )) :
            <span>{error}</span>}
    </AlbumListUl>
  );
}

AlbumList.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  albumList: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default AlbumList;
