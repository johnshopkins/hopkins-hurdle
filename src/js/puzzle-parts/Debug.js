import React from 'react';

import { local as localStorage } from '../helpers/storage';

import '../../css/Debug.scss';

export default ({ clearMessage, displayMessage, id }) => {

  const clearPuzzleData = () => {
    localStorage.remove('hopkinshurdle.' + id);
    localStorage.remove('hopkinshurdle.seenInfo');
  };

  return (
    <div className={'debug'}>
      <button onClick={clearPuzzleData}>Clear stored puzzle data</button>
      <button onClick={clearMessage}>Clear message</button>
      <button onClick={displayMessage}>Display message</button>
    </div>
  );
};
