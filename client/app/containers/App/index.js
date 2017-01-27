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
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

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
`;


export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <Page>
        <Header />
        <Content>
          {React.Children.toArray(this.props.children)}
        </Content>
        <Footer />
      </Page>
    );
  }
}
