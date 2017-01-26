import React from 'react';
import styled from 'styled-components';

import NowPlayingItem from './NowPlayingItem';

const UL = styled.ul`
  list-style: none;
  padding-left: 0;
`;

function NowPlayingList({ loading, error, activePlaylistContents }) {
  return (
    <UL>
      {error === false ?
          (!loading && activePlaylistContents) && activePlaylistContents.map((item, i) => (
            <NowPlayingItem key={i} item={item} />
          )) :
            <span>{error.toString()}</span>}
    </UL>
  );
}

NowPlayingList.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  activePlaylistContents: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export default NowPlayingList;
