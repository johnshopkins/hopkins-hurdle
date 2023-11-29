import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateAnimationDuration } from '../helpers/animation-delay-calc';
import { local as localStorage } from '../helpers/storage';
import { savePuzzleState, loadPuzzleState } from '../helpers/persistance';
import { publish } from '../helpers/events';

import Answer from '../puzzle-parts/Answer';
import Debug from '../puzzle-parts/Debug';
import InfoModal from '../puzzle-parts/InfoModal';
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
      modalOpen: false,
    };

    this.closeModal = this.closeModal.bind(this);

    this.displayMessage = this.displayMessage.bind(this);
    this.onGuessFail = this.onGuessFail.bind(this);
    this.onPuzzlePass = this.onPuzzlePass.bind(this);
    this.openInfoModal = this.openInfoModal.bind(this);

    this.clearMessage = this.clearMessage.bind(this);
  }

  componentDidMount() {
    if (this.props.autoInfoModal && localStorage.get('hopkinshurdle.seenInfo') === null) {
      this.openInfoModal(false);
    }
  }

  openInfoModal(userInitiated = true) {
    this.setState({ modalOpen: 'info' });

    if (userInitiated) {
      publish('userInitiatedInfoModal');
    }
  }

  closeModal() {
    document.body.classList.remove('modal-open');

    if (this.state.modalOpen === 'info') {
      localStorage.set('hopkinshurdle.seenInfo', true);
    }

    this.setState({ modalOpen: null });
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
        // for accessibility -- how to visually hide this?
        this.displayMessage({
          type: 'info',
          message: 'Your guess is incorrect. Try again.'
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
    this.setState({ message: message });
  }

  onPuzzleEnd(numberOfGuesses) {

    setTimeout(() => {

      this.displayMessage({
        message: this.state.puzzle.status === 'PASS' ? 'Great job!' : 'Better luck next time.'
      });

      const delayUntilModal = this.state.puzzle.status === 'PASS' ?
        calculateAnimationDuration('jump', this.props.puzzle.answer, true) :
        this.props.modalDelay;

      setTimeout(() => {
        this.onPuzzleComplete(this.props.id, this.state.puzzle.status, numberOfGuesses);
      }, delayUntilModal);

    }, calculateAnimationDuration('flip', this.props.puzzle.answer, true));
  }

  render() {

    const remainingGuesses = this.availableGuesses - (this.state.puzzle.guesses.filter(n => n).length);

    const attributes = {
      'aria-hidden': this.props.hidden,
      'aria-label': 'Puzzle',
      className: 'hopkins-hurdle',
      role: 'region',
    };

    return (
      <div {...attributes}>
        {this.state.modalOpen === 'info' &&
          <InfoModal onClose={this.closeModal} />
        }
        <Message
          hidden={this.props.hidden || Boolean(this.state.modalOpen)}
          onTtl={this.clearMessage}
          {...this.state.message}
        />
        <Utilities
          hidden={this.props.hidden || Boolean(this.state.modalOpen)}
          openInfoModal={() => this.openInfoModal()}
          closeModal={this.closeModal}
        />
        <Guesses
          answerDescription={this.props.puzzle.answerDescription}
          currentRow={this.state.puzzle.currentRow}
          correctAnswer={this.props.puzzle.answer.toUpperCase()}
          guesses={this.state.puzzle.guesses}
          hidden={this.props.hidden || Boolean(this.state.modalOpen)}
          id={this.props.id}
          onGuessFail={this.onGuessFail}
          onPuzzlePass={this.onPuzzlePass}
          remainingGuesses={remainingGuesses}
          puzzleStatus={this.state.puzzle.status}
        />
        {this.state.puzzle.status === 'FAIL' && <Answer answer={this.props.puzzle.answer} answerTemplate={this.props.answerTemplate} />}
        {this.props.debug && <Debug id={this.props.id} />}
      </div>
    );
  }

}

Puzzle.defaultProps = {
  autoInfoModal: true,
  debug: false,
  hidden: false,
  modalDelay: 500,
  onPuzzleComplete: (status, numberOfGuesses) => { },
  answerTemplate: null,
};

Puzzle.propTypes = {
  hidden: PropTypes.bool.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  modalDelay: PropTypes.number.isRequired,
  puzzle: PropTypes.object.isRequired,
  onPuzzleComplete: PropTypes.func,
  answerTemplate: PropTypes.string,
};

export default Puzzle;
