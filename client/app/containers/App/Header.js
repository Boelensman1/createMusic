import React from 'react';
import Breadcrumbs from 'react-breadcrumbs';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  flex: 0 0 auto;
  background-color: #dcdcdc;
  color: black;
  .breadcrumbs {
    .step {
      a {
        color: blue;
      }
    }
  }
`;

function Header(props) {
  return (
    <HeaderDiv>
      <Breadcrumbs
        wrapperClass="breadcrumbs"
        itemClass="step"
        routes={props.routes}
        params={props.params}
      />
    </HeaderDiv>
  );
}

Header.propTypes = {
  routes: React.PropTypes.array,
  params: React.PropTypes.object,
};

export default Header;
