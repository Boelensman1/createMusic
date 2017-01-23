import React from 'react';

export default ({getArtists, artists}) => (
  <div>
    <button onClick={getArtists}>load artists</button>
    {artists && (
      <ul>
        {artists.map((artist, i) => (
          <li key={i}>{artist}</li>
        ))}
      </ul>
    )}
  </div>
);
