import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';

const InfoModal = ({ onClose, testing }) => {

  return (
    <Modal label={'Information'} classes={['info']} onClose={onClose} testing={testing}>
      <h1>How to play</h1>
      <p>Instructions on how to play here</p>
    </Modal>
  )
};

InfoModal.defaultProps = {
  testing: false,
};

InfoModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  testing: PropTypes.bool,
};

export default InfoModal;
