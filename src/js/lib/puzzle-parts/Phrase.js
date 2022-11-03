import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Letter from './Letter';

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
        status: this.props.isComplete ?
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
    this.onEnter = this.onEnter.bind(this);

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

      state.guess = state.guess.map(g => {
        g.status = this.evaluateGuessForCorrectness(g.guessedLetter, g.correctLetter, g.i);
        if (g.status !== 'pass') success = false;
        return g;
      })

      this.incorrect.map(i => {
        state.guess[i].status = this.evaluateWrongGuesses(state.guess[i].guessedLetter);
        if (state.guess[i].status !== 'pass') success = false;
      });

      const guess = state.guess.map(g => g.guessedLetter).join('');

      success ?
        this.props.onPass(guess) :
        this.props.onFail(guess);

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
        // not the last letter. go back a letter and remove its value
        update.activeLetter = state.activeLetter - 1;
        guess[i - 1].guessedLetter = '';
      }

      update.guess = guess;

      return update;
    });
  }

  onEnter() {

    const guess = this.state.guess.map(guess => guess.guessedLetter).join('');

    if (guess.length < this.props.correctAnswer.length) {
      this.props.displayMessage({
        type: 'error',
        message: 'Not enough letters'
      });
    } else {
      this.evaluateGuess();
    }
  }

  render() {
    return <div className={'guess'} role={'group'} aria-label={'Guess ' + (this.props.phraseNumber + 1)}>
      {this.state.guess.map((character, i) =>
        <Letter
          animate={this.state.animate}
          direction={this.state.direction}
          focus={this.props.isCurrentRow && this.state.activeLetter === i}
          isComplete={this.props.isComplete}
          isSpace={character.correctLetter === ' '}
          key={i}
          letterNumber={i}
          onBackspace={() => this.onBackspace(i)}
          isCurrentRow={this.props.isCurrentRow}
          onChange={(letter) => this.onChange(letter, i)}
          onEnter={this.onEnter}
          onRefocusComplete={this.props.onRefocusComplete}
          triggerFocus={this.props.triggerFocus && this.props.isCurrentRow && this.state.activeLetter === i}
          status={character.status}
          value={character.guessedLetter} />
      )}
    </div>
  }
}

Phrase.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
  phraseNumber: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  displayMessage: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onPass: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  triggerFocus: PropTypes.bool.isRequired,
};

export default Phrase;
