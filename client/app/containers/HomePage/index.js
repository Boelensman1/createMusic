/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadArtistList } from 'containers/App/actions';
import { makeSelectArtistList, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import ArtistList from './ArtistList';
import messages from './messages';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { refreshArtists, loading, artistList, error } = this.props;
    return (
      <h1>
        <FormattedMessage {...messages.header} />
        <button onClick={refreshArtists}>refresh artists</button>
        <ArtistList loading={loading} artistList={artistList} error={error} />
      </h1>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  artistList: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  refreshArtists: React.PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    refreshArtists: () => dispatch(loadArtistList()),
  };
}


const mapStateToProps = createStructuredSelector({
  artistList: makeSelectArtistList(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
