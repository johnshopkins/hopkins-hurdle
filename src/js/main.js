import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { savePuzzleState, loadPuzzleState } from './lib/helpers/persistance';
import Answer from './lib/puzzle-parts/Answer';
import Guesses from './lib/puzzle-parts/Guesses';
import Message from './lib/puzzle-parts/Message';

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;

    this.loadPuzzle = id => loadPuzzleState(id);
    this.savePuzzle = (id, puzzle) => savePuzzleState(id, puzzle);

    // fetch any stored data from localStorage
    const stored = this.loadPuzzle(this.props.id) || {};

    // combine stored and default state
    this.state = {
      guesses: Array.apply(null, Array(this.availableGuesses)).map(() => ''),
      currentRow: 0,
      message: {},
      status: 'IN_PROGRESS',

      // // for testing
      // guesses: [
      //   'teseet tape', '', '', '', '', ''
      // ],
      // currentRow: 1,

      ...stored,
    };

    // console.log('Puzzle state', this.state);

    this.clearLocalStorage = this.clearLocalStorage.bind(this);
    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);
  }

  clearLocalStorage() {
    localStorage.removeItem('hopkinshurdle.' + this.props.id);
  }

  onGuessFail(guess) {
    this.setState((state) => {

      // state keys to update
      const update = {};

      // update guesses
      state.guesses[state.currentRow] = guess;
      update.guesses = state.guesses;

      // ran out of guesses
      if (state.currentRow + 1 === this.availableGuesses){
        update.status = 'FAIL';
      } else {
        update.currentRow = state.currentRow + 1
      }

      return update;
    }, this.onPuzzleEnd);
  }

  onPuzzlePass(guess) {
    this.setState((state) => {

      // state keys to update
      const update = {
        status: 'PASS'
      };

      // update guesses
      state.guesses[state.currentRow] = guess;
      update.guesses = state.guesses;

      return update;

    }, this.onPuzzleEnd);
  }

  clearMessage() {
    this.setState({ message: {} });
  }

  displayMessage(message) {

    this.setState({ message: message });

    setTimeout(() => {
      this.clearMessage();
    }, message.ttl || 5000)
  }
  
  onPuzzleEnd() {

    this.savePuzzle(this.props.id, this.state);

    setTimeout(() => {
      this.displayMessage({
        type: 'error',
        message: this.state.status === 'PASS' ? 'Great job!' : 'Better luck next time.'
      });
    }, (this.props.puzzle.answer.length * 100) + 750) // 750ms after animation finishes
  }

  render() {
    return (
      <>
        {this.state.message && <Message {...this.state.message} />}
        <Guesses
          guesses={this.state.guesses}
          currentRow={this.state.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          displayMessage={this.displayMessage}
          onPuzzlePass={this.onPuzzlePass}
          onGuessFail={this.onGuessFail}
          status={this.state.status}
        />
        {this.props.debug && <button onClick={this.clearLocalStorage}>Clear stored data</button>}
        {this.state.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
      </>
    );
  }

}

Puzzle.defaultProps = {
  debug: false
};

Puzzle.propTypes = {
  id: PropTypes.number.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default Puzzle;
