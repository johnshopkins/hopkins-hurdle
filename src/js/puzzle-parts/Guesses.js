import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Phrase from './Phrase';

import '../../css/Guesses.scss';

class Guesses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      triggerFocus: false
    };

    this.triggerRefocus = this.triggerRefocus.bind(this);
    this.onRefocusComplete = this.onRefocusComplete.bind(this);
  }

  triggerRefocus() {
    this.setState({ triggerFocus: true });
  }

  onRefocusComplete() {
    this.setState({ triggerFocus: false });
  }

  render() {

    const attributes = {
      'aria-label': 'Guesses',
      className: 'guesses',
      onClick: this.triggerRefocus,
      role: 'region',
    };

    const answerDescription = `${this.props.answerDescription} You have ${this.props.remainingGuesses} ${this.props.remainingGuesses === 1 ? 'guess' : 'guesses'} remaining.`;

    return <div {...attributes}>
      <p className={'visuallyhidden'}>{answerDescription}</p>
      {this.props.guesses.map((guess, i) =>
        <Phrase
          correctAnswer={this.props.correctAnswer}
          guess={guess}
          id={this.props.id}
          isRowComplete={this.props.puzzleStatus !== 'IN_PROGRESS' || i < this.props.currentRow}
          isCurrentRow={this.props.currentRow === i}
          key={i}
          onFail={this.props.onGuessFail}
          onPass={this.props.onPuzzlePass}
          onNotWord={this.props.onGuessNotWord}
          onRefocusComplete={this.onRefocusComplete}
          phraseNumber={i}
          puzzleStatus={this.props.puzzleStatus}
          triggerFocus={this.state.triggerFocus}
        />
      )}
    </div>
  }

}

Guesses.propTypes = {
  answerDescription: PropTypes.string.isRequired,
  currentRow: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  guesses: PropTypes.array.isRequired,
  onGuessFail: PropTypes.func.isRequired,
  onGuessNotWord: PropTypes.func.isRequired,
  onPuzzlePass: PropTypes.func.isRequired,
  remainingGuesses: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.string.isRequired,
};

export default Guesses;
