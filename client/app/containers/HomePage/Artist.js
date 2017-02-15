import React from 'react';

import { Link } from 'react-router';

import styled from 'styled-components';

const ArtistLi = styled.li`
  padding-bottom: 0.5em;
  padding-top: 0.5em;
  border-top: #7C7C7C 1px solid;
  border-bottom: #7C7C7C 1px solid;
  a {
    color: white;
    }
`;

function Artist({ artist: { name } }) {
  return (
    <ArtistLi>
      <Link to={`/artist/${encodeURIComponent(name)}`}>{name}</Link>
    </ArtistLi>
  );
}

Artist.propTypes = {
  artist: React.PropTypes.object,
};

export default Artist;
