import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Phrase from './Phrase';

class Guesses extends Component {

  constructor(props) {
    super(props);

    this.refocus = this.refocus.bind(this);
  }

  refocus() {
    console.log('Guesses::refocus', 'how to refocus???')
    // console.log(this.props.currentRow)
  }

  render() {
    return <div className={'guesses'} onClick={this.refocus}>
      {this.props.guesses.map((guess, i) =>
        <Phrase
          correctAnswer={this.props.correctAnswer}
          isComplete={this.props.status !== 'IN_PROGRESS' || i < this.props.currentRow}
          isCurrentRow={this.props.currentRow === i}
          guess={guess}
          phraseNumber={i}
          key={i}
          onFail={this.props.onGuessFail}
          onPass={this.props.onPuzzlePass}
          refocus={this.refocus}
        />
      )}
    </div>
  }

}

Guesses.propTypes = {
  guesses: PropTypes.array.isRequired,
  currentRow: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  onPuzzlePass: PropTypes.func.isRequired,
  onGuessFail: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default Guesses;
