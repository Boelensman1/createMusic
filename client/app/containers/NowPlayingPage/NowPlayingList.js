import React from 'react';

import NowPlayingItem from './NowPlayingItem';

function NowPlayingList({ loading, error, activePlaylistContents }) {
  return (
    <ul>
      {error === false ?
          (!loading && activePlaylistContents) && activePlaylistContents.map((item, i) => (
            <NowPlayingItem key={i} item={item} />
          )) :
            <span>{error}</span>}
    </ul>
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
