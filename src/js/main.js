import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateAnimationDuration } from './helpers/animation-delay-calc';
import { local as localStorage } from './helpers/storage';
import { savePuzzleState, loadPuzzleState } from './helpers/persistance';
import Statistics from './helpers/statistics';

import Answer from './puzzle-parts/Answer';
import Clue from './puzzle-parts/Clue';
import Debug from './puzzle-parts/Debug';
import InfoModal from './puzzle-parts/InfoModal';
import Guesses from './puzzle-parts/Guesses';
import Message from './puzzle-parts/Message';
import StatisticsModal from './puzzle-parts/StatisticsModal';
import SupportingContent from './puzzle-parts/SupportingContent';
import Utilities from './puzzle-parts/Utilities';
import {class as classUtils} from "js-utils";

class Puzzle extends Component {

  constructor(props) {

    props.puzzle.answer = props.puzzle.answer.toUpperCase();

    super(props);

    this.availableGuesses = 6;

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
      modalOpen: false,
      supportingContent: null
    };

    this.closeModal = this.closeModal.bind(this);

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

  closeModal() {
    classUtils.removeClass(document.body, 'modal-open');
    this.setState({ modalOpen: null });
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
        // for accessibility -- how to visually hide this?
        this.displayMessage({
          type: 'info',
          message: 'Your guess is incorrect. Try again.'
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
    this.onPuzzleComplete(this.state.puzzle.status, numberOfGuesses);

    setTimeout(() => {

      this.displayMessage({
        message: this.state.puzzle.status === 'PASS' ? 'Great job!' : 'Better luck next time.';
      });

      const delayUntilModal = this.state.puzzle.status === 'PASS' ?
        calculateAnimationDuration('jump', this.props.puzzle.answer, true) :
        500;

      setTimeout(() => {
        this.setState({ modalOpen: 'stats' })
      }, delayUntilModal);

    }, calculateAnimationDuration('flip', this.props.puzzle.answer, true));
  }

  render() {

    const remainingGuesses = this.availableGuesses - (this.state.puzzle.guesses.filter(n => n).length);

    return (
      <div className={'hopkins-hurdle'}>
        {this.state.modalOpen === 'stats' &&
          <StatisticsModal
            logger={this.props.logger}
            onClose={this.closeModal}
            stats={this.stats.stats}
          />
        }
        {this.state.modalOpen === 'info' &&
          <InfoModal onClose={this.closeModal} />
        }
        <Message
          hidden={Boolean(this.state.modalOpen)}
          onTtl={this.clearMessage}
          {...this.state.message}
        />
        <Utilities
          hidden={Boolean(this.state.modalOpen)}
          openInfoModal={() => this.setState({ modalOpen: 'info' })}
          openStatsModal={() => this.setState({ modalOpen: 'stats' })}
          closeModal={this.closeModal}
        />
        {this.state.puzzle.status === 'IN_PROGRESS' && this.props.puzzle.clues && <Clue
          clue={this.props.puzzle.clues[this.state.puzzle.currentRow]}
          currentRow={this.state.puzzle.currentRow}
          hidden={Boolean(this.state.modalOpen)}
        /> }
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          guesses={this.state.puzzle.guesses}
          hidden={Boolean(this.state.modalOpen)}
          onGuessFail={this.onGuessFail}
          onPuzzlePass={this.onPuzzlePass}
          remainingGuesses={remainingGuesses}
          puzzleStatus={this.state.puzzle.status}
        />
        {this.state.puzzle.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} />}
        {this.state.puzzle.status !== 'IN_PROGRESS' && this.state.supportingContent && <SupportingContent hidden={this.state.modalOpen} {...this.state.supportingContent} />}
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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  puzzle: PropTypes.object.isRequired,
  onPuzzleComplete: PropTypes.func,
};

export default Puzzle;
