import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { savePuzzleState, loadPuzzleState} from './lib/helpers/persistance';
import { local as localStorage } from './lib/helpers/storage';

import Statistics from './lib/helpers/statistics';

import Answer from './lib/puzzle-parts/Answer';
import Clue from './lib/puzzle-parts/Clue';
import Guesses from './lib/puzzle-parts/Guesses';
import Message from './lib/puzzle-parts/Message';
import StatisticsModal from './lib/puzzle-parts/StatisticsModal';

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;

    this.loadPuzzle = id => loadPuzzleState(id);
    this.savePuzzle = (id, puzzle) => savePuzzleState(id, puzzle);

    // fetch any stored data from localStorage
    const stored = this.loadPuzzle(this.props.id) || {};

    this.stats = new Statistics(this.availableGuesses, localStorage, this.props.logger);
    // console.log('starting stats', this.stats.stats);

    // combine stored and default state
    this.state = {
      message: {},
      puzzle: {
        guesses: Array.apply(null, Array(this.availableGuesses)).map(() => ''),
        currentRow: 0,
        status: 'IN_PROGRESS',
        ...stored,
      }
    };

    // console.log('Puzzle state', this.state);
    this.clearPuzzleData = this.clearPuzzleData.bind(this);
    this.clearStatsData = this.clearStatsData.bind(this);
    this.incrementStats = this.incrementStats.bind(this);

    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);
  }

  clearPuzzleData() {
    localStorage.remove('hopkinshurdle.' + this.props.id);
  }

  clearStatsData() {
    localStorage.remove('hopkinshurdle.stats');
  }

  incrementStats() {
    console.log(this.stats.increment())
  }

  openStatsModal() {

  }

  onGuessFail(guess, numberOfGuesses) {
    this.setState((state) => {

      const puzzle = state.puzzle;

      // update guesses
      puzzle.guesses[puzzle.currentRow] = guess;

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
          type: 'info',
          message: 'Your guess is incorrect.'
        });
      }
    });
  }

  onPuzzlePass(guess, numberOfGuesses) {
    this.setState((state) => {

      const puzzle = state.puzzle;
      puzzle.status = 'PASS';

      // update guesses
      puzzle.guesses[puzzle.currentRow] = guess;
      puzzle.guesses = puzzle.guesses;

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

    this.setState({ message: message });

    setTimeout(() => {
      this.clearMessage();
    }, message.ttl || 5000)
  }
  
  onPuzzleEnd(numberOfGuesses) {

    this.stats.stats = this.stats.update(this.state.puzzle.status, numberOfGuesses);
    // console.log('updated stats', this.stats)

    setTimeout(() => {
      this.displayMessage({
        type: 'error',
        message: this.state.puzzle.status === 'PASS' ? 'Great job!' : 'Better luck next time.'
      });
    }, (this.props.puzzle.answer.length * 100) + 750) // 750ms after animation finishes
  }

  render() {

    const remainingGuesses = this.availableGuesses - (this.state.puzzle.guesses.filter(n => n).length);

    console.log(this.state)

    return (
      <>
        <StatisticsModal stats={this.stats.stats} />
        <Message {...this.state.message} />
        <Clue
          clue={this.props.puzzle.clues[this.state.puzzle.currentRow]}
          currentRow={this.state.puzzle.currentRow}
        />
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          guesses={this.state.puzzle.guesses}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          displayMessage={this.displayMessage}
          onPuzzlePass={this.onPuzzlePass}
          onGuessFail={this.onGuessFail}
          remainingGuesses={remainingGuesses}
          status={this.state.puzzle.status}
        />
        {this.props.debug && <button onClick={this.clearPuzzleData}>Clear stored puzzle data</button>}
        {this.props.debug && <button onClick={this.clearStatsData}>Clear stored stats data</button>}
        {this.props.debug && <button onClick={this.incrementStats}>Increment Stats</button>}
        {this.props.debug && <button onClick={this.openStatsModal}>Open Stats Modal</button>}
        {this.state.puzzle.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
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
