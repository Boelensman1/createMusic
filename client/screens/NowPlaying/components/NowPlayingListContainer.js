import React from 'react';

import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';

import NowPlayingList from './NowPlayingList';

const mapActionCreators = {
  getNowPlaying: () => feathersServices.playlists.get('current'),
};

const mapStateToProps = (state) => ({
  nowPlayingList: state.playlists.data && state.playlists.data.current,
});

// decorate with redux
export default connect(mapStateToProps, mapActionCreators)(NowPlayingList);
