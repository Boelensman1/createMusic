import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

class NowPlayingList extends Component {
  constructor(props) {
    super(props);
    props.getNowPlaying();
  }

  render() {
    const { nowPlayingList } = this.props;
    return (
      <List>
        {nowPlayingList && nowPlayingList.map((nowPlayingItem, i) => (
            <ListItem
              key={i}
              primaryText={nowPlayingItem.title}
            />
        ))}
      </List>
    );
  }
}

NowPlayingList.propTypes = {
  getNowPlaying: React.PropTypes.func.isRequired,
  nowPlayingList: React.PropTypes.array,
};

export default NowPlayingList;
