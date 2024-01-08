import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';

import CloseIcon from '../icons/Close';

import '../../css/Modal.scss';

class Modal extends Component {

  constructor(props) {

    super(props);

    this.state = {
      open: this.props.open
    };

    // see: https://github.com/focus-trap/focus-trap#testing-in-jsdom
    this.focusTrapOptions = this.props.testing ? {
      tabbableOptions: {
        displayCheck: 'none'
      }
    } : {};

    this.modal = createRef();

    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onClose() {
    this.setState({ open: false });
    document.body.classList.remove('modal-open');
    this.props.onClose();
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.onClose();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === this.props.open) {
      return;
    }

    // set new state
    this.setState({ open: this.props.open });

    // add/remove body class
    if (this.props.open) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // hide or show other elements based on new state
    for (let item of document.body.children) {
      if (this.props.open) {
        item.setAttribute('aria-hidden', true);
      } else {
        item.removeAttribute('aria-hidden');
      }
    }
  }

  getAttributes(label) {
    const attributes = {
      className: 'hh-modal-container',
      role: 'dialog',
    };

    if (label) {
      attributes['aria-label'] = label;
    }

    return attributes;
  }

  getClasses() {
    this.props.classes.push('modal-content');
    return this.props.classes.join(' ');
  }

  render() {

    const attributes = this.getAttributes(this.props.label);

    const modal = (
      <div {...attributes} onKeyDown={this.onKeyDown} ref={this.modal}>
        <FocusTrap focusTrapOptions={this.focusTrapOptions}>
          <div className={this.getClasses()}>
            <button className={'close-box-x'} aria-label={'Close modal'} onClick={this.onClose}>
              <CloseIcon />
            </button>
            {this.props.children}
          </div>
        </FocusTrap>
        <div className={'overlay'} />
      </div>
    );

    return this.state.open ? createPortal(modal, document.body) : null;
  }
};

Modal.defaultProps = {
  classes: [],
  onClose: () => {},
  open: false,
  testing: false,
};

Modal.propTypes = {
  classes: PropTypes.array,
  label: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  testing: PropTypes.bool,
};

export default Modal;
