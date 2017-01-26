import React from 'react';

function NowPlayingItem({ item }) {
  return (
    <li>{item.title}</li>
  );
}

NowPlayingItem.propTypes = {
  item: React.PropTypes.object,
};

export default NowPlayingItem;
