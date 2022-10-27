import React, { Component } from 'react';

class Puzzle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<p>puzzle</p>);
  }

}

Puzzle.defaultProps = {
  puzzles: [],
};

export default Puzzle;
