import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

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
      {clue.photo && <Image {...clue.photo} />}
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
