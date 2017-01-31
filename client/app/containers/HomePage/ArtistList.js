import React from 'react';

function ArtistList({ loading, error, artistList }) {
  return (
    <ul>
      {error === false ?
          (!loading && artistList) && artistList.map((artist, i) => (
            <li key={i}>{artist}</li>
          )) :
            <span>{error}</span>}
    </ul>
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
