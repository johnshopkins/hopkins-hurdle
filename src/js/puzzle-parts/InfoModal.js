import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';

import '../../css/InfoModal.scss';

const defaultColors = {
  correct: 'green',
  shuffle: 'yellow',
  incorrect: 'gray'
};

const InfoModal = ({ colors, onClose, open, testing }) => {

  const c = {
    ...defaultColors,
    ...colors,
  };

  return (
    <Modal classes={['info']} onClose={onClose} open={open} testing={testing}>
      <h1>How it works</h1>
      <p>Just as in Wordle and the many spinoffs it has inspired since its October 2021 debut, Hopkins Huddle asks the user to solve word puzzles. In this case, each puzzle is a five-letter word.</p>
      <p>Begin by entering a five-letter word into the first set of squares and pressing RETURN or ENTER.</p>
      <ul>
        <li>Letters that are part of the solution AND are in the correct position will appear in <span className={'correct'}>{c.correct.toUpperCase()}</span> squares</li>
        <li>Letters that are part of the solution BUT are in the incorrect position will appear in <span className={'shuffle'}>{c.shuffle.toUpperCase()}</span> squares</li>
        <li>Letters that are not part of the correct solution will appear in <span className={'incorrect'}>{c.incorrect.toUpperCase()}</span> squares</li>
      </ul>
      <p>Based on this information, continue guessing until you have solved the puzzle. The object is to get the correct answer in as few tries as possible. If you enter six guesses without solving the puzzle, we'll give you the correct answer.</p>
      <p>From there, it's on to the next word puzzle; there are six in all.</p>
    </Modal>
  )
};

InfoModal.defaultProps = {
  colors: defaultColors,
  testing: false,
};

InfoModal.propTypes = {
  colors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  testing: PropTypes.bool,
};

export default InfoModal;
