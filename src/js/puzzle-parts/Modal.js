import React from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import getAttributes from '../helpers/modal-attributes';

import CloseIcon from '../icons/Close';

import '../../css/Modal.scss';

const Modal = ({ children, classes, label, onClose, testing }) => {

  const attributes = getAttributes(label);

  classes.push('modal-content');

  document.body.classList.add('modal-open');

  // see: https://github.com/focus-trap/focus-trap#testing-in-jsdom
  const focusTrapOptions = testing ? {
    tabbableOptions: {
      displayCheck: 'none'
    }
  } : {};

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  const modal = (
    <div {...attributes} onKeyDown={onKeyDown}>
      <FocusTrap focusTrapOptions={focusTrapOptions}>
        <div className={classes.join(' ')}>
          <button className={'close-box-x'} aria-label={'Close modal'} onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </FocusTrap>
      <div className={'overlay'} />
    </div>
  );

  return createPortal(modal, document.body);
};

Modal.defaultProps = {
  classes: [],
  testing: false,
};

Modal.propTypes = {
  classes: PropTypes.array,
  label: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  testing: PropTypes.bool,
};

export default Modal;
