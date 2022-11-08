import React from 'react';

export default ({ clue, currentRow }) => {

  const attributes = {
    'aria-label': 'Clue',
    'aria-live': 'polite',
    className: 'clue',
    role: 'region'
  };

  const header = `Clue #${currentRow + 1}`;

  return (
    <div {...attributes}>
      <h2>{header}</h2>
      <img src={clue.photo.url} alt={clue.photo.alt_text} />
      <p>{clue.text}</p>
    </div>
  );

}
