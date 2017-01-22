import React from 'react';

import { connect } from 'react-redux';
import errors from 'feathers-errors';

import { feathersServices } from '../../../feathers';

import ArtistList from './ArtistList';

const mapActionCreators = {
  getArtists: feathersServices.artists.find,
}

const mapStateToProps = (state) => ({
  artists: state.artists.queryResult,
})

// decorate with redux
export default connect(mapStateToProps, mapActionCreators)(ArtistList)

