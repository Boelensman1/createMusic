/*
 *
 * AlbumPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectLoading, makeSelectError, makeSelectAlbumSongList } from './selectors';
import { loadAlbumSongList } from './actions';

import SongList from './SongList';
import AlbumTopBar from './AlbumTopBar';

export class AlbumPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    albumSongList: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    params: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    getAlbum: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { params: { artistName, albumName } } = this.props;
    if (albumName) {
      this.props.getAlbum(artistName, albumName);
    }
  }
  render() {
    const { loading, error, albumSongList } = this.props;
    return (
      <div>
        {error === false ?
            (!loading && albumSongList) &&
            <div>
              <AlbumTopBar firstSong={albumSongList[0]} />
              <SongList songList={albumSongList} />
            </div>
            :
            <span>{error}</span>}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  albumSongList: makeSelectAlbumSongList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAlbum: (albumArtist, albumName) => dispatch(loadAlbumSongList(albumArtist, albumName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
