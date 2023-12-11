import React, { Component, createRef } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';
import FocusTrap from 'focus-trap-react';
import { publish } from '../helpers/events';

import getAttributes from '../helpers/modal-attributes';

import CloseIcon from '../icons/Close';

import '../../css/Modal.scss';

class Modal extends Component {

  constructor(props) {

    props.classes.push('modal-content');

    super(props);

    // see: https://github.com/focus-trap/focus-trap#testing-in-jsdom
    this.focusTrapOptions = this.props.testing ? {
      tabbableOptions: {
        displayCheck: 'none'
      }
    } : {};

    this.modal = createRef();

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(e) {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  }

  componentDidMount() {
    publish('modalOpen');
    document.body.classList.add('modal-open');
    const siblings = this.modal.current.parentNode.children;
    for (let item of siblings) {
      if (item !== this.modal.current) {
        item.setAttribute('aria-hidden', true);
      }
    }
  }

  componentWillUnmount() {
    publish('modalClose');
    document.body.classList.remove('modal-open');
    const siblings = this.modal.current.parentNode.children;
    for (let item of siblings) {
      if (item !== this.modal.current) {
        item.removeAttribute('aria-hidden');
      }
    }
  }

  render() {

    const attributes = getAttributes(this.props.label);

    const modal = (
      <div {...attributes} onKeyDown={this.onKeyDown} ref={this.modal}>
        <FocusTrap focusTrapOptions={this.focusTrapOptions}>
          <div className={this.props.classes.join(' ')}>
            <button className={'close-box-x'} aria-label={'Close modal'} onClick={this.props.onClose}>
              <CloseIcon />
            </button>
            {this.props.children}
          </div>
        </FocusTrap>
        <div className={'overlay'} />
      </div>
    );

    return createPortal(modal, document.body);
  }
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
