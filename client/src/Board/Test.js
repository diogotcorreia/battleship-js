import React, { Component } from 'react';

class Test extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props.boardRef);
    return <div></div>;
  }
}

export default Test;
