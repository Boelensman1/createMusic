import React from 'react';

import Artist from './Artist';

import styled from 'styled-components';

const ArtistListUl = styled.ul`
  list-style: none;
  padding: 0;
`;

function ArtistList({ loading, error, artistList }) {
  return (
    <ArtistListUl>
      {error === false ?
          (!loading && artistList) && artistList.map((artist, i) => (
            <Artist key={i} artist={artist} />
          )) :
            <span>{error}</span>}
    </ArtistListUl>
  );
}

ArtistList.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  artistList: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default ArtistList;
