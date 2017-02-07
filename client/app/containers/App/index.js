/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import NowPlayingPage from 'containers/NowPlayingPage';

import Header from './Header';
import Footer from './Footer';

import { loadNowPlaying, loadActivePlayList } from './actions';

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1 1 auto;
  position: relative; /* need this to position inner content */
  overflow-y: auto;
  padding: 1em;
  @media (max-width: 500px) {
    font-size: 10pt;
  }
`;

const DualContent = styled.div`
  flex: 1 1 auto;
  display: flex;
  height: 100%;
  @media (max-width: 500px) {
    font-size: 10pt;
  }
`;

const DualContentInner = styled.div`
  position: relative; /* need this to position inner content */
  overflow-y: auto;
  padding: 1em;
  width: 50%;
`;

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
    loadNowPlaying: React.PropTypes.func.isRequired,
    loadActivePlaylist: React.PropTypes.func.isRequired,
    routes: React.PropTypes.array,
    params: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.props.loadNowPlaying();
    this.props.loadActivePlaylist();
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { routes, params, children } = this.props;
    const { width } = this.state;
    return (
      <Page>
        <Header routes={routes} params={params} />
        { (width > 1000) ?
          <DualContent>
            <DualContentInner>
              {React.Children.toArray(children)}
            </DualContentInner>
            <DualContentInner>
              <NowPlayingPage />
            </DualContentInner>
          </DualContent> :
          <Content>
            {React.Children.toArray(children)}
          </Content>
        }
        <Footer />
      </Page>
    );
  }
}
  /*
    render: function() {
        return <span>{this.state.width} x {this.state.height}</span>;
    },
    */


function mapDispatchToProps(dispatch) {
  return {
    loadNowPlaying: () => dispatch(loadNowPlaying()),
    loadActivePlaylist: () => dispatch(loadActivePlayList()),
  };
}

export default connect(null, mapDispatchToProps)(App);
