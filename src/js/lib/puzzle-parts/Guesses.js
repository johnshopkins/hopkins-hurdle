import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Phrase from './Phrase';

class Guesses extends Component {

  constructor(props) {
    super(props);

    this.state = {
      triggerFocus: false
    };

    this.triggerRefocus = this.triggerRefocus.bind(this);
    this.onRefocusComplete = this.onRefocusComplete.bind(this);
  }

  /**
   * Change the state t
   */
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

    const answerDescription = `The answer consists of ${this.props.answerDescription}. You have ${this.props.remainingGuesses} guesses remaining.`;

    return <div {...attributes}>
      <h2>Guesses</h2>
      <p className={'visuallyhidden'}>{answerDescription}</p>
      {this.props.guesses.map((guess, i) =>
        <Phrase
          correctAnswer={this.props.correctAnswer}
          isComplete={this.props.status !== 'IN_PROGRESS' || i < this.props.currentRow}
          isCurrentRow={this.props.currentRow === i}
          guess={guess}
          phraseNumber={i}
          key={i}
          displayMessage={this.props.displayMessage}
          onFail={this.props.onGuessFail}
          onPass={this.props.onPuzzlePass}
          onRefocusComplete={this.onRefocusComplete}
          triggerFocus={this.state.triggerFocus}
        />
      )}
    </div>
  }

}

Guesses.propTypes = {
  guesses: PropTypes.array.isRequired,
  currentRow: PropTypes.number.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  displayMessage: PropTypes.func.isRequired,
  onPuzzlePass: PropTypes.func.isRequired,
  onGuessFail: PropTypes.func.isRequired,
  remainingGuesses: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default Guesses;
