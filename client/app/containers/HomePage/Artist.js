import React from 'react';

import { Link } from 'react-router';

import styled from 'styled-components';

const ArtistLi = styled.li`
  a {
    color: white;
    }
`;

function Artist({ artist: { name } }) {
  return (
    <ArtistLi>
      <Link to={`/artist/${name}`}>{name}</Link>
    </ArtistLi>
  );
}

Artist.propTypes = {
  artist: React.PropTypes.object,
};

export default Artist;
