import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const FooterDiv = styled.div`
  flex: 0 0 auto;
  background-color: #dcdcdc;
  color: black;
`;

function Footer() {
  return (
    <FooterDiv>
      <Link to="nowPlaying">now playing</Link>
    </FooterDiv>
  );
}

export default Footer;
