import React from 'react';
import PropTypes from 'prop-types';

const convertPuzzlesToEmojis = (puzzle, correctAnswer) => puzzle.evaluatedGuesses.map((guess) => {

  if (guess.length === 0) {
    // '⬜️'
    return '⬛️'.repeat(correctAnswer.length);
  }

  return guess.map((letter) => {
    switch (letter.status) {
      case 'pass': return '🟩';
      case 'shuffle': return '🟨';
      case 'fail': return '🟥';
    }
  }).join('');

}).join("\n");

const Share = ({ correctAnswer, puzzle }) => {

  const share = () => {

    const text = 'Hopkins Hurdle' + "\n" + convertPuzzlesToEmojis(puzzle, correctAnswer);
    
    if (typeof navigator.share === 'function') {
      navigator.share({
        url: 'https://hub.jhu.edu/hopkins-hurdle/',
        title: 'Hopkins Hurdle',
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
    
  };

return <button onClick={share}>Share</button>;
};

Share.propTypes = {
  puzzle: PropTypes.object.isRequired,
};

export default Share;
