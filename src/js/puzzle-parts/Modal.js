import React from 'react';

import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { class as classUtils } from 'js-utils';

import getAttributes from '../helpers/modal-attributes';

import CloseIcon from '../icons/Close';

import '../../css/Modal.scss';

const Modal = ({ children, classes, label, onClose, testing }) => {

  const attributes = getAttributes(label);

  classes.push('modal-content');

  classUtils.addClass(document.body, 'modal-open');

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

  return (
    <div {...attributes} onKeyDown={onKeyDown}>
      <FocusTrap focusTrapOptions={focusTrapOptions}>
        <div className={classes.join(' ')}>
          <button className={'close'} aria-label={'Close modal'} onClick={onClose}>
            <CloseIcon />
          </button>
          {children}
        </div>
      </FocusTrap>
      <div className={'overlay'} />
    </div>
  )
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
