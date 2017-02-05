import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const FooterDiv = styled.div`
  flex: 0 0 auto;
  background-color: #dcdcdc;
  color: black;
`;

const FooterButtonDiv = styled.div`
  display: inline-block;
  margin-right: 1em;
  a {
    display: block;
    padding: 0.1em;
    &.active {
      border: red solid;
    }
  }
`;

function FooterButton({ to, label }) {
  return (
    <FooterButtonDiv>
      <Link to={to} activeClassName="active">{label}</Link>
    </FooterButtonDiv>
  );
}
FooterButton.propTypes = {
  to: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

function Footer() {
  return (
    <FooterDiv>
      <FooterButton to="/" label="Artists" />
      <FooterButton to="/nowPlaying" label="Now Playing" />
    </FooterDiv>
  );
}

export default Footer;
