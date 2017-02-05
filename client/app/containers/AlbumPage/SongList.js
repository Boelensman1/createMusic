import React from 'react';

import styled from 'styled-components';

import Song from './Song';

const SongListUl = styled.ul`
  list-style: none;
  padding-left: 0;
`;

function SongList({ songList }) {
  return (
    <SongListUl>
      {
        songList.map((song, i) => (
          <Song key={i} song={song} />
        ))
      }
    </SongListUl>
  );
}

SongList.propTypes = {
  songList: React.PropTypes.array.isRequired,
};

export default SongList;
