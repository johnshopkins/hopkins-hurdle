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

    const guess = this.state.guess;

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

      return { guess: state.guess };
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

      // update guess
      state.guess[i].guessedLetter = letter;

      return {
        activeLetter: state.activeLetter + 1,
        direction: 'forward',
        guess: state.guess,
      }
    });
  }

  onBackspace(i) {
    this.setState((state) => {

      if (state.activeLetter === 0 ) {
        // we're back at the beginning
        return {};
      }

      // remove guess from newly focused input
      state.guess[i - 1].guessedLetter = '';

      return {
        activeLetter: state.activeLetter - 1,
        direction: 'backward',
        guess: state.guess,
      }
    });
  }

  onEnter() {
    console.log('Phrase::onEnter', 'evaluate!')
    if (this.state.guess.length < this.props.correctAnswer.length) {
      console.log('you need to finish ')
    } else {
      this.evaluateGuess();
    }
  }

  render() {
    return <div className={'word'}>
      {this.state.guess.map((character, i) =>
        <Letter
          direction={this.state.direction}
          focus={this.props.isCurrentRow && this.state.activeLetter === i}
          isComplete={this.props.isComplete}
          isSpace={character.correctLetter === ' '}
          key={i}
          i={i}
          onBackspace={() => this.onBackspace(i)}
          onEnter={this.onEnter}
          onChange={(letter) => this.onChange(letter, i)}
          refocus={this.props.refocus}
          status={character.status}
          value={character.guessedLetter} />
      )}
    </div>
  }
}

Phrase.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  guess: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  refocus: PropTypes.func.isRequired,
  onFail: PropTypes.func.isRequired,
  onPass: PropTypes.func.isRequired,
};

export default Phrase;
