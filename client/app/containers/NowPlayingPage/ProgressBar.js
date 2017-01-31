/* eslint-disable no-underscore-dangle */

import React from 'react';
import styled from 'styled-components';

const Meter = styled.div`
  height: 5px;
  background: #555;

  span {
    display: block;
    height: 100%;
    background-color: red;
    overflow: hidden;
  }
`;

export class ProgressBar extends React.Component {
  static propTypes = {
    initialElapsed: React.PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    duration: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = ({ elapsed: 0 });
  }

  componentDidMount() {
    this.startCounting();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ elapsed: nextProps.initialElapsed });
  }

  componentWillUnmount() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }

  startCounting() {
    this._timer = setInterval(this.doCount.bind(this), 1000);
  }

  doCount() {
    this.setState({ elapsed: this.state.elapsed + 1 });
  }


  render() {
    const progress = (this.state.elapsed / this.props.duration) * 100;
    return (
      <Meter>
        <span style={{ width: `${progress}%` }}></span>
      </Meter>
    );
  }
}

export default ProgressBar;
