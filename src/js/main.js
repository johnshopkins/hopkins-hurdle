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
    this.onPuzzleComplete = props.onPuzzleComplete || function (status, numberOfGuesses) {};

    // fetch any stored data from localStorage
    const stored = this.loadPuzzle(this.props.id) || {};

    this.stats = new Statistics(this.availableGuesses, localStorage, this.props.logger);

    // combine stored and default state
    this.state = {
      message: {},
      puzzle: {
        guesses: Array.apply(null, Array(this.availableGuesses)).map(() => ''),
        currentRow: 0,
        status: 'IN_PROGRESS',
        ...stored,
      },
      statMobileOpen: false
    };

    this.clearPuzzleData = this.clearPuzzleData.bind(this);
    this.clearStatsData = this.clearStatsData.bind(this);
    this.incrementStats = this.incrementStats.bind(this);

    this.openStatsModal = this.openStatsModal.bind(this);
    this.closeStatsModal = this.closeStatsModal.bind(this);

    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);

    this.clearMessage = this.clearMessage.bind(this);
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
    this.setState({ statMobileOpen: true });
  }

  closeStatsModal() {
    this.setState({ statMobileOpen: false });
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
  }
  
  onPuzzleEnd(numberOfGuesses) {

    this.stats.stats = this.stats.update(this.state.puzzle.status, numberOfGuesses);
    this.onPuzzleComplete(this.state.puzzle.status, numberOfGuesses)

    setTimeout(() => {
      this.displayMessage({
        type: 'error',
        message: this.state.puzzle.status === 'PASS' ? 'Great job!' : 'Better luck next time.'
      });
    }, (this.props.puzzle.answer.length * 100) + 750) // 750ms after animation finishes
  }

  render() {

    const remainingGuesses = this.availableGuesses - (this.state.puzzle.guesses.filter(n => n).length);

    return (
      <>
        <StatisticsModal
          onClose={this.closeStatsModal}
          open={this.state.statMobileOpen}
          stats={this.stats.stats}
        />
        <Message
          hidden={this.state.statMobileOpen}
          onTtl={this.clearMessage}
          {...this.state.message}
        />
        { this.props.puzzle.clues && <Clue
          clue={this.props.puzzle.clues[this.state.puzzle.currentRow]}
          currentRow={this.state.puzzle.currentRow}
          hidden={this.state.statMobileOpen}
        /> }
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          displayMessage={this.displayMessage}
          guesses={this.state.puzzle.guesses}
          hidden={this.state.statMobileOpen}
          onGuessFail={this.onGuessFail}
          onPuzzlePass={this.onPuzzlePass}
          remainingGuesses={remainingGuesses}
          status={this.state.puzzle.status}
        />
        {this.state.puzzle.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
        {this.props.debug &&
          <div className={'debug'}>
            <div>
              <button onClick={this.clearPuzzleData}>Clear stored puzzle data</button>
              <button onClick={this.clearStatsData}>Clear stored stats data</button>
            </div>
            <div>
              <button onClick={this.incrementStats}>Increment Stats</button>
              <button onClick={this.openStatsModal}>Open Stats Modal</button>
            </div>
          </div>
        }
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
  onPuzzleComplete: PropTypes.func,
};

export default Puzzle;
