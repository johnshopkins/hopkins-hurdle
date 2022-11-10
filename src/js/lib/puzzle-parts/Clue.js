import React from 'react';
import PropTypes from "prop-types";

const Clue = ({ clue, currentRow, hidden }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Clue',
    'aria-live': 'polite',
    className: 'clue',
    role: 'region'
  };

  const header = `Clue #${currentRow + 1}`;

  return (
    <div {...attributes}>
      <h2>{header}</h2>
      {clue.photo && clue.photo.url && clue.photo.alt_text && <img src={clue.photo.url} alt={clue.photo.alt_text} />}
      {clue.text && <p>{clue.text}</p>}
    </div>
  );

};

Clue.propTypes = {
  clue: PropTypes.object.isRequired,
  currentRow: PropTypes.number.isRequired,
  hidden: PropTypes.bool.isRequired,
};

export default Clue;
