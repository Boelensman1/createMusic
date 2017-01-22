import React from 'react';

export default ({getArtists, artists}) => (
  <div>
    <h1 onClick={getArtists}>load artists</h1>
    {artists && (
      <ul>
        {artists.map((artist, i) => (
          <li key={i}>{artist}</li>
        ))}
      </ul>
    )}
  </div>
);
