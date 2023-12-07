import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Letter from './Letter';

import { publish } from '../helpers/events';
import wordlist from '../data/words';

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

      const guess = state.guess.map(g => g.guessedLetter).join('');

      if (!wordlist.includes(guess.toLowerCase())) {
        this.props.onNotWord();
        return false;
      }

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

      if (state.activeLetter === state.guess.length - 1 && guess[i].guessedLetter.match(/[A-Za-z]/)) {
        // last letter and NOT EMPTY. remove the letter, but do not move the cursor
        guess[i].guessedLetter = '';
      } else {
        update.activeLetter = state.activeLetter - 1;
        guess[i - 1].guessedLetter = '';
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
          focus={this.props.puzzleStatus === 'IN_PROGRESS' && this.props.isCurrentRow && this.state.activeLetter === i}
          isRowComplete={this.props.isRowComplete}
          isCurrentRow={this.props.isCurrentRow}
          isLastLetter={i === this.state.guess.length - 1}
          isSpace={character.correctLetter === ' '}
          key={i}
          letterNumber={i}
          onBackspace={() => this.onBackspace(i)}
          onEnter={this.evaluateGuess}
          onChange={(letter) => this.onChange(letter, i)}
          onRefocusComplete={this.props.onRefocusComplete}
          puzzleStatus={this.props.puzzleStatus}
          status={character.status}
          triggerFocus={this.props.triggerFocus && this.props.isCurrentRow && this.state.activeLetter === i}
          value={character.guessedLetter}
          />
      )}
    </div>
  }
}

Phrase.defaultProps = {};

Phrase.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
  isRowComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  onFail: PropTypes.func.isRequired,
  onNotWord: PropTypes.func.isRequired,
  onPass: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  phraseNumber: PropTypes.number.isRequired,
  puzzleStatus: PropTypes.string.isRequired,
  triggerFocus: PropTypes.bool.isRequired,
};

export default Phrase;
