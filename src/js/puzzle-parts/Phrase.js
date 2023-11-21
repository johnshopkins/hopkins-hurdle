import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Letter from './Letter';
import SubmitButton from './SubmitButton';

import { publish } from '../helpers/events';

class Phrase extends Component {

  constructor(props) {
    super(props);

    this.letterPool = this.props.correctAnswer.replace(/\s/g, '').split(''); // spaces removed

    this.correct = [];
    this.incorrect = [];

    // initial pass to see which letters are correct
    const guess = this.props.correctAnswer.split('').map((letter, i) => {

      const guessedLetter = this.props.guess[i] || '';

      return {
        i: i,
        correctLetter: letter,
        guessedLetter: guessedLetter,
        status: this.props.isRowComplete ?
          this.evaluateGuessForCorrectness(guessedLetter, letter, i) :
          null
      }
    });

    // second pass on incorrect letters to see if maybe they just need to be shuffled
    // had to do this separate so that guessed letters later in the guess aren't included in the pool
    // of available letters
    this.incorrect.map(i => {
      guess[i].status = this.evaluateWrongGuesses(guess[i].guessedLetter);
    });

    this.state = {
      activeLetter: 0,
      direction: 'forward', // forward (new latter) OR backward (backspace)
      submitButtonActive: false,
      guess: guess,
      animate: false,
    };

    this.onBackspace = this.onBackspace.bind(this);
    this.onChange = this.onChange.bind(this);
    this.evaluateGuess = this.evaluateGuess.bind(this);

  }

  evaluateGuessForCorrectness(guessedLetter, correctLetter, i) {

    if (guessedLetter === correctLetter) {
      // take this letter out of this.letterPool
      this.removeLetterFromPool(guessedLetter);
      this.correct.push(i);
      return 'pass';
    } else {
      this.incorrect.push(i);
    }

    return null;
  }

  evaluateWrongGuesses(guessedLetter) {

    if (this.letterPool.indexOf(guessedLetter) !== -1) {
      this.removeLetterFromPool(guessedLetter);
      return 'shuffle';
    } else {
      return 'fail';
    }
  }

  evaluateGuess() {

    this.setState((state) => {

      let success = true;

      // update guess

      // check each letter for correctness. if correct; remove that letter from the letter pool
      state.guess = state.guess.map(g => {
        g.status = this.evaluateGuessForCorrectness(g.guessedLetter, g.correctLetter, g.i);
        if (g.status !== 'pass') success = false;
        return g;
      })

      // now that we know which letters are correct, let's evaluate the wrong letters
      // need to do this separately because Array.map() can't do a lookahead check
      this.incorrect.map(i => {
        state.guess[i].status = this.evaluateWrongGuesses(state.guess[i].guessedLetter);
        if (state.guess[i].status !== 'pass') success = false;
      });

      const guess = state.guess.map(g => g.guessedLetter).join('');

      success ?
        this.props.onPass(guess, state.guess, this.props.phraseNumber + 1) :
        this.props.onFail(guess, state.guess, this.props.phraseNumber + 1);

      publish('userGuess', {
        success: success,
        guess: guess,
        id: this.props.id,
      });

      return {
        animate: true,
        guess: state.guess
      };
    });
  }

  removeLetterFromPool(letter) {
    const index = this.letterPool.indexOf(letter);
    if (index > -1) {
      this.letterPool.splice(index, 1);
    }
  }

  onChange(letter, i) {
    this.setState((state) => {

      const update = {
        direction: 'forward',
      };

      const guess = state.guess;

      if (state.activeLetter !== guess.length - 1) {
        // only increase the activeLetter if we're NOT on the last letter
        update.activeLetter = state.activeLetter + 1
      } else {
        // focus on submit button
        update.submitButtonActive = true;
        update.activeLetter = false;
      }

      // update guess
      guess[i].guessedLetter = letter;

      update.guess = guess;

      return update;
    });
  }

  onBackspace(i) {
    this.setState((state) => {

      if (state.activeLetter === 0 ) {
        // we're back at the beginning already
        return {};
      }

      const update = {
        direction: 'backward'
      };

      const guess = state.guess;

      if (!state.submitButtonActive) {
        update.activeLetter = state.activeLetter - 1;
        guess[i - 1].guessedLetter = '';
      } else {
        update.submitButtonActive = false;
        update.activeLetter = guess.length - 1;
        guess[guess.length - 1].guessedLetter = '';
      }

      update.guess = guess;

      return update;
    });
  }

  render() {

    let label = `Guess #${this.props.phraseNumber + 1}`;

    if (this.props.isRowComplete) {
      label += ': complete'
    } else if (this.props.isCurrentRow) {
      label += ': in progress'
    }

    const attributes = {
      'aria-hidden': !this.props.testing && (this.props.isRowComplete || this.props.isCurrentRow),
      'aria-label': label,
      className: 'guess',
      role: 'group'
    }

    return <div {...attributes}>
      {this.state.guess.map((character, i) =>
        <Letter
          animate={this.state.animate}
          correctAnswer={this.props.correctAnswer}
          direction={this.state.direction}
          focus={this.props.isCurrentRow && this.state.activeLetter === i}
          isRowComplete={this.props.isRowComplete}
          isCurrentRow={this.props.isCurrentRow}
          isSpace={character.correctLetter === ' '}
          key={i}
          letterNumber={i}
          onBackspace={() => this.onBackspace(i)}
          onChange={(letter) => this.onChange(letter, i)}
          onRefocusComplete={this.props.onRefocusComplete}
          puzzleStatus={this.props.puzzleStatus}
          status={character.status}
          triggerFocus={this.props.triggerFocus && this.props.isCurrentRow && this.state.activeLetter === i}
          value={character.guessedLetter}
          />
      )}
      {this.props.isCurrentRow &&
        <SubmitButton
          focus={this.state.submitButtonActive}
          onBackspace={() => this.onBackspace(null)}
          onSubmit={this.evaluateGuess}
          onRefocusComplete={this.props.onRefocusComplete}
          triggerFocus={this.props.triggerFocus && this.state.submitButtonActive}
        />
      }
    </div>
  }
}

Phrase.defaultProps = {
  testing: false,
};

Phrase.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
  isRowComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  onFail: PropTypes.func.isRequired,
  onPass: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  phraseNumber: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.string.isRequired,
  testing: PropTypes.bool,
  triggerFocus: PropTypes.bool.isRequired,
};

export default Phrase;
