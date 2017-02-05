import React from 'react';

import styled from 'styled-components';

const SongLi = styled.li`
  padding: 0.1rem;
`;

// function Song({ song: { name } }) {
// <Link to={`/song/${name}`}>{name}</Link>
function Song({ song: { title, track } }) {
  return (
    <SongLi>
      {track}: {title}
    </SongLi>
  );
}

Song.propTypes = {
  song: React.PropTypes.object,
};

export default Song;
