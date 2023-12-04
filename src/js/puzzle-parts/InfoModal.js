import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';

import '../../css/InfoModal.scss';

const InfoModal = ({ colors, onClose, testing }) => {

  return (
    <Modal label={'Information'} classes={['info']} onClose={onClose} testing={testing}>
      <h1>How it works</h1>
      <p>Just as in Wordle and the many spinoffs it has inspired since its October 2021 debut, Hopkins Huddle asks the user to solve word puzzles. In this case, each puzzle is a five-letter word.</p>
      <p>Begin by entering a five-letter word into the first set of squares and pressing SUBMIT.</p>
      <p>Letters that are part of the solution AND are in the correct position will appear in <span className={'correct'}>{colors.correct.toUpperCase()}</span> squares</p>
      <p>Letters that are part of the solution BUT are in the incorrect position will appear in <span className={'shuffle'}>{colors.shuffle.toUpperCase()}</span> squares</p>
      <p>Letters that are not part of the correct solution will appear in <span className={'incorrect'}>{colors.incorrect.toUpperCase()}</span> squares</p>
      <p>Based on this information, continue guessing until you have solved the puzzle. The object is to get the correct answer in as few tries as possible. If you enter six guesses without solving the puzzle, we'll give you the correct answer.</p>
      <p>From there, it's on to the next word puzzle; there are six in all.</p>
      <p>Note: Experienced Wordle players will know that the game only accepts actual words; no gibberish permitted. While our game technically won't enforce this rule, it's much more fun to play that way.</p>
    </Modal>
  )
};

InfoModal.defaultProps = {
  colors: {
    correct: 'green',
    shuffle: 'yellow',
    incorrect: 'gray'
  },
  testing: false,
};

InfoModal.propTypes = {
  colors: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  testing: PropTypes.bool,
};

export default InfoModal;
