import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateAnimationDuration } from '../helpers/animation-delay-calc';
import { savePuzzleState, loadPuzzleState } from '../helpers/persistance';
import getNiceLetterStatus from '../helpers/nice-letter-status';

import Debug from '../puzzle-parts/Debug';
import Guesses from '../puzzle-parts/Guesses';
import Message from '../puzzle-parts/Message';
import Utilities from '../puzzle-parts/Utilities';

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;

    this.loadPuzzle = id => loadPuzzleState(id);
    this.savePuzzle = (id, puzzle) => savePuzzleState(id, puzzle);
    this.onPuzzleComplete = this.props.onPuzzleComplete;

    // fetch any stored data from localStorage
    const stored = this.loadPuzzle(this.props.id) || {};

    // combine stored and default state
    this.state = {
      message: {},
      puzzle: {
        evaluatedGuesses: Array.apply(null, Array(this.availableGuesses)).map(() => []),
        guesses: Array.apply(null, Array(this.availableGuesses)).map(() => ''),
        currentRow: 0,
        status: 'IN_PROGRESS',
        ...stored,
      },
    };

    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onGuessNotWord = this.onGuessNotWord.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);

    this.clearMessage = this.clearMessage.bind(this);
  }

  getOrdinal(i) {
    const ordinals = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    return ordinals[i - 1];
  }

  getIncorrectGuessMessage(evaluatedGuess, numberOfGuesses) {
    let message = `Your ${this.getOrdinal(numberOfGuesses)} guess is incorrect. `;

    message += evaluatedGuess.map((character) => {
      return `The ${this.getOrdinal(character.i +1)} letter, ${character.guessedLetter}, is ${getNiceLetterStatus(character.status)}.`;
    }).join(' ');

    return message;
  }

  onGuessNotWord() {
    this.displayMessage({
      message: 'This word is not on our approved list.',
      ttl: 3000,
    });
  }

  onGuessFail(guess, evaluatedGuess, numberOfGuesses) {
    this.setState((state) => {

      const puzzle = state.puzzle;

      // update guesses
      puzzle.guesses[puzzle.currentRow] = guess;
      puzzle.evaluatedGuesses[puzzle.currentRow] = evaluatedGuess;

      // ran out of guesses
      if (puzzle.currentRow + 1 === this.availableGuesses){
        puzzle.status = 'FAIL';
      } else {
        puzzle.currentRow = puzzle.currentRow + 1
      }

      return { puzzle: puzzle};

    }, () => {
      this.savePuzzle(this.props.id, this.state.puzzle);

      if (this.state.puzzle.status === 'FAIL') {
        this.onPuzzleEnd(numberOfGuesses);
      } else {
        this.displayMessage({
          message: this.getIncorrectGuessMessage(evaluatedGuess, numberOfGuesses),
          screenReaderOnly: true,
        });
      }
    });
  }

  onPuzzlePass(guess, evaluatedGuess, numberOfGuesses) {
    this.setState((state) => {

      const puzzle = state.puzzle;
      puzzle.status = 'PASS';

      // update guesses
      puzzle.guesses[puzzle.currentRow] = guess;

      puzzle.evaluatedGuesses[puzzle.currentRow] = evaluatedGuess;

      return { puzzle: puzzle };

    }, () => {
      this.savePuzzle(this.props.id, this.state.puzzle);
      this.onPuzzleEnd(numberOfGuesses);
    });
  }

  clearMessage() {
    this.setState({ message: {} });
  }

  displayMessage(message) {
    this.clearMessage(); // removes the <p> first to allow for css animations on new <p>
    this.setState({ message: message });
  }

  getPuzzleEndMessage(status) {
    if (status === 'PASS') {
      return this.props.successMessage;
    }
    
    const parts = this.props.failMessage.split('{answer}');
    return <>{parts[0]}<strong>{this.props.puzzle.answer}</strong>{parts[1]}</>;
  }

  onPuzzleEnd(numberOfGuesses) {

    setTimeout(() => {

      this.displayMessage({
        message: this.getPuzzleEndMessage(this.state.puzzle.status)
      });

      const delayForAnimation = this.state.puzzle.status === 'PASS' ?
        calculateAnimationDuration('jump', this.props.puzzle.answer, true) :
        0;

      setTimeout(() => {
        this.onPuzzleComplete(this.props.id, this.state.puzzle.status, numberOfGuesses);
      }, delayForAnimation);

    }, calculateAnimationDuration('flip', this.props.puzzle.answer, true));
  }

  render() {

    const remainingGuesses = this.availableGuesses - (this.state.puzzle.guesses.filter(n => n).length);

    const attributes = {
      'aria-label': 'Puzzle',
      className: 'hopkins-hurdle',
      role: 'region',
    };

    return (
      <div {...attributes}>
        <Utilities
          autoInfoModal={this.props.autoInfoModal}
          colors={this.props.colors}
        />
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          guesses={this.state.puzzle.guesses}
          id={this.props.id}
          onGuessFail={this.onGuessFail}
          onGuessNotWord={this.onGuessNotWord}
          onPuzzlePass={this.onPuzzlePass}
          remainingGuesses={remainingGuesses}
          puzzleStatus={this.state.puzzle.status}
        />
        <Message
          onTtl={this.clearMessage}
          {...this.state.message}
        />
        {this.props.debug &&
        <Debug
          id={this.props.id}
          clearMessage={this.clearMessage}
          displayMessage={() => this.displayMessage({
            message: 'This is a test message!'
          })}
        />}
      </div>
    );
  }

}

Puzzle.defaultProps = {
  autoInfoModal: true,
  debug: false,
  onPuzzleComplete: (status, numberOfGuesses) => { },
  failMessage: 'The correct answer is {answer}.',
  successMessage: 'Great job!',
  colors: {},
};

Puzzle.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  puzzle: PropTypes.object.isRequired,
  onPuzzleComplete: PropTypes.func,
  failMessage: PropTypes.string.isRequired,
  successMessage:  PropTypes.string.isRequired,
  colors: PropTypes.object,
};

export default Puzzle;
