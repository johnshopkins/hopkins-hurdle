import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../icons/Info';
import StatsIcon from '../icons/Stats';

import '../../css/Utilities.scss';

const Utilities = ({ hidden, openInfoModal, openStatsModal }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Utilities',
    className: 'utils',
    role: 'region',
  };

  return (
    <div {...attributes}>
      <button aria-label={'Information'} onClick={openInfoModal}>
        <InfoIcon />
      </button>
      <button aria-label={'Statistics'} onClick={openStatsModal}>
        <StatsIcon />
      </button>
    </div>
  );
}


Utilities.Utilities = {
  openInfoModal: PropTypes.func.isRequired,
  openStatsModal: PropTypes.func.isRequired,
};

export default Utilities;
