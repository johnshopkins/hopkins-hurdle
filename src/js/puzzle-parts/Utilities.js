import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../icons/Info';
import InfoModal from '../puzzle-parts/InfoModal';
import { local as localStorage } from '../helpers/storage';
import { publish } from '../helpers/events';

import '../../css/Utilities.scss';

const Utilities = ({ autoInfoModal, colors }) => {

  const [infoModalOpened, setInfoModalOpened] = useState(false);

  // runs only on first render
  useEffect(() => {
    if (autoInfoModal && localStorage.get('hopkinshurdle.seenInfo') === null) {
      openModal(false);
    }
  }, []);

  const closeModal = () => {
    setInfoModalOpened(false);
    localStorage.set('hopkinshurdle.seenInfo', true);
  };

  const openModal = (userInitiated = true) => {
    setInfoModalOpened(true);

    if (userInitiated) {
      publish('userInitiatedInfoModal');
    }
  };

  return (
    <div className={'utils'}>
      <button onClick={openModal}>
        <InfoIcon /> How it works
      </button>
      <InfoModal
        colors={colors}
        onClose={closeModal}
        open={infoModalOpened}
      />
    </div>
  );
}

Utilities.defaultProps = {
  autoInfoModal: true,
  colors: {},
};

Utilities.propTypes = {
  autoInfoModal: PropTypes.bool,
  colors: PropTypes.object,
};

export default Utilities;
