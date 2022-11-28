import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { savePuzzleState, loadPuzzleState} from './helpers/persistance';
import { local as localStorage } from './helpers/storage';

import Statistics from './helpers/statistics';

import Answer from './puzzle-parts/Answer';
import Clue from './puzzle-parts/Clue';
import Debug from './puzzle-parts/Debug';
import Guesses from './puzzle-parts/Guesses';
import Message from './puzzle-parts/Message';
import StatisticsModal from './puzzle-parts/StatisticsModal';
import SupportingContent from './puzzle-parts/SupportingContent';

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;
    this.supportingContent = null;

    this.loadPuzzle = id => loadPuzzleState(id);
    this.savePuzzle = (id, puzzle) => savePuzzleState(id, puzzle);
    this.onPuzzleComplete = props.onPuzzleComplete || function (status, numberOfGuesses) { };
    this.fetchSupportingContent = props.fetchSupportingContent || function (endpoint, callback) { };

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
      statModalOpen: false,
      supportingContent: null
    };

    this.openStatsModal = this.openStatsModal.bind(this);
    this.closeStatsModal = this.closeStatsModal.bind(this);

    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);

    this.clearMessage = this.clearMessage.bind(this);
  }

  componentDidMount() {
    if (typeof this.props.puzzle.supportingContent === 'string') {
      // this.fetchSupportingContent should return an object with the following keys: headline, link, summary, thumbnail
       this.fetchSupportingContent(this.props.puzzle.supportingContent, (data) => {
         this.setState({ supportingContent: data });
      });
    }
  }

  openStatsModal() {
    this.setState({ statModalOpen: true });
  }

  closeStatsModal() {
    this.setState({ statModalOpen: false });
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
        <StatisticsModal
          onClose={this.closeStatsModal}
          open={this.state.statModalOpen}
          stats={this.stats.stats}
        />
      <div className={'hopkins-hurdle'}>
        <Message
          hidden={this.state.statModalOpen}
          onTtl={this.clearMessage}
          {...this.state.message}
        />
        {this.state.puzzle.status === 'IN_PROGRESS' && this.props.puzzle.clues && <Clue
          clue={this.props.puzzle.clues[this.state.puzzle.currentRow]}
          currentRow={this.state.puzzle.currentRow}
          hidden={this.state.statModalOpen}
        /> }
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          displayMessage={this.displayMessage}
          guesses={this.state.puzzle.guesses}
          hidden={this.state.statModalOpen}
          onGuessFail={this.onGuessFail}
          onPuzzlePass={this.onPuzzlePass}
          remainingGuesses={remainingGuesses}
          status={this.state.puzzle.status}
        />
        {this.state.puzzle.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
        {this.state.puzzle.status !== 'IN_PROGRESS' && this.state.supportingContent && <SupportingContent hidden={this.state.statModalOpen} {...this.state.supportingContent} />}
        {this.props.debug && <Debug id={this.props.id} />}
      </div>
    );
  }

}

Puzzle.defaultProps = {
  debug: false
};

Puzzle.propTypes = {
  fetchSupportingContent: PropTypes.func,
  id: PropTypes.number.isRequired,
  puzzle: PropTypes.object.isRequired,
  onPuzzleComplete: PropTypes.func,
};

export default Puzzle;
