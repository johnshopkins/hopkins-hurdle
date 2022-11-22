import React from 'react';
import PropTypes from 'prop-types';

import { local as localStorage } from '../helpers/storage';

import '../../css/Debug.scss';

const Debug = ({ id, incrementStats }) => {

  const clearPuzzleData = () => {
    localStorage.remove('hopkinshurdle.' + id);
  };

  const clearStatsData = () => {
    localStorage.remove('hopkinshurdle.stats');
  };

  return (
    <div className={'debug'}>
      <button onClick={clearPuzzleData}>Clear stored puzzle data</button>
      <button onClick={clearStatsData}>Clear stored stats data</button>
    </div>
  );
}


Debug.Debug = {
  incrementStats: PropTypes.func.isRequired,
};

export default Debug;
