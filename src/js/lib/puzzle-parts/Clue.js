import React from 'react';

export default ({ clue }) =>
  <div className={'clue'}>
    <img src={`images/${clue.photo.url}`} alt={clue.photo.alt_text} />
    <p>{clue.text}</p>
  </div>
