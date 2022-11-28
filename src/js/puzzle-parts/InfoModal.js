import React from 'react';

import PropTypes from 'prop-types';

import Modal from './Modal';

const InfoModal = ({ onClose, testing }) => {

  return (
    <Modal label={'Information'} classes={['info']} onClose={onClose} testing={testing}>
      <h1>Information</h1>
      <p>Modal stuff here</p>
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
