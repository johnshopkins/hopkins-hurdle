import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { savePuzzleState, loadPuzzleState } from './lib/helpers/persistance';
import Answer from './lib/puzzle-parts/Answer';
import Guesses from './lib/puzzle-parts/Guesses';

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;

    this.loadPuzzle = id => loadPuzzleState(id);
    this.savePuzzle = (id, puzzle) => savePuzzleState(id, puzzle);

    // localStorage.removeItem('hopkinshurdle.' + this.props.id);

    // fetch any stored data from localStorage
    const stored = this.loadPuzzle(this.props.id) || {};

    // combine stored and default state
    this.state = {
      guesses: Array.apply(null, Array(this.availableGuesses)).map(() => ''),
      currentRow: 0,
      status: 'IN_PROGRESS',

      // // for testing
      // guesses: [
      //   'teseet tape', '', '', '', '', ''
      // ],
      // currentRow: 1,

      ...stored,
    };

    console.log('Puzzle state', this.state);

    this.clearLocalStorage = this.clearLocalStorage.bind(this);
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

  onPuzzleEnd() {

    this.savePuzzle(this.props.id, this.state);

  }

  render() {
    return (
      <>
        <Guesses
          guesses={this.state.guesses}
          currentRow={this.state.currentRow}
          correctAnswer={this.props.puzzle.answer}
          onPuzzlePass={this.onPuzzlePass}
          onGuessFail={this.onGuessFail}
          status={this.state.status}
        />
        <button onClick={this.clearLocalStorage}>Clear stored data</button>
        {this.state.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
      </>
    );
  }

}

Puzzle.defaultProps = {
};

Puzzle.propTypes = {
  id: PropTypes.number.isRequired,
  puzzle: PropTypes.object.isRequired,
};

export default Puzzle;
