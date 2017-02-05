/*
 *
 * ArtistPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectArtistAlbumList } from './selectors';
import { loadArtistAlbumList } from './actions';

import AlbumList from './AlbumList';

export class ArtistPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    artistAlbumList: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]),
    params: React.PropTypes.object.isRequired,
    loading: React.PropTypes.bool.isRequired,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
    getArtist: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { params: { artistName } } = this.props;
    if (artistName) {
      this.props.getArtist(artistName);
    }
  }
  render() {
    const { children } = this.props;

    if (children) {
      return (<div>{children}</div>);
    }


    const { loading, error, artistAlbumList, params: { artistName } } = this.props;
    return (
      <div>
        {artistName}
        <AlbumList
          loading={loading}
          albumList={artistAlbumList}
          error={error}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  artistAlbumList: makeSelectArtistAlbumList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getArtist: (artistName) => dispatch(loadArtistAlbumList(artistName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
