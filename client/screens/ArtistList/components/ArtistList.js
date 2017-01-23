import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

// rightAvatar={<Avatar src="images/chexee-128.jpg" />}}

const getFirstLetter = (artist) => {
  if (artist[0].match(/[a-z]/i)) { return artist[0].toUpperCase(); }
  if (artist[0].match(/[0-9]/)) { return '123'; }
  return '#';
};

class ArtistList extends Component {
  constructor(props) {
    super(props);
    props.getArtists();
  }

  render() {
    const { artists } = this.props;

    const artistListPerLetter = {};
    if (artists) {
      artists.forEach((artist, i) => {
        const firstLetter = getFirstLetter(artist);
        if (!artistListPerLetter[firstLetter]) {
          artistListPerLetter[firstLetter] = [(
            <ListItem
              key={i}
              leftAvatar={<Avatar style={{ left: 8 }}> {firstLetter} </Avatar>}
              primaryText={artist}
            />
          )];
        } else {
          artistListPerLetter[firstLetter].push(
            <ListItem
              key={i}
              insetChildren
              primaryText={artist}
            />
          );
        }
      });
    }

    return (
      <List>
        {Object.keys(artistListPerLetter).map((key) => (
          <div key={key}>
            <List>
              {artistListPerLetter[key].map((artistItem) => (artistItem))}
            </List>
            <Divider inset />
          </div>
        ))}
      </List>
    );
  }
}

ArtistList.propTypes = {
  getArtists: React.PropTypes.func.isRequired,
  artists: React.PropTypes.array,
};

export default ArtistList;
