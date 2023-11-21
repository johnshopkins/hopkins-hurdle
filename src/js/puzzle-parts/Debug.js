import React from 'react';
import PropTypes from 'prop-types';

import { local as localStorage } from '../helpers/storage';

import '../../css/Debug.scss';

export default ({ id }) => {

  const clearPuzzleData = () => {
    localStorage.remove('hopkinshurdle.' + id);
    localStorage.remove('hopkinshurdle.seenInfo');
  };

  return (
    <div className={'debug'}>
      <button onClick={clearPuzzleData}>Clear stored puzzle data</button>
    </div>
  );
};
