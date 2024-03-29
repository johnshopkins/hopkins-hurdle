import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateAnimationDelay } from '../helpers/animation-delay-calc';
import getNiceLetterStatus from '../helpers/nice-letter-status';

class Letter extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.input = React.createRef();

    this.animationDelay = '0ms';

    // calculate initial animation delay (assuming flip)
    this.setAnimationDelay();
  }

  componentDidMount() {
    this.maybeFocus();
  }

  componentDidUpdate() {
    this.maybeFocus();
  }

  setAnimationDelay() {
    const animation = this.props.puzzleStatus === 'PASS' && this.props.isCurrentRow ? 'jump' : 'flip';
    this.animationDelay = calculateAnimationDelay(this.props.letterNumber, animation, this.props.correctAnswer);
  }

  maybeFocus() {
    if (this.props.focus) {
      this.input.current.focus();

      if (this.props.triggerFocus) {
        this.props.onRefocusComplete();
      }

      if (this.props.isSpace) {
        if (this.props.direction === 'forward') {
          // autochange (skip) spaces
          this.onChange(' ')
        } else {
          // backspace again to skip space input
          this.props.onBackspace()
        }
      }
    }
  }

  getClass() {

    const classes = [];

    if (this.props.isSpace) {
      classes.push('space');
    }

    if (this.props.status) {
      classes.push(this.props.status);
    }

    if (this.props.animate) {
      classes.push('animate');
      classes.push(this.props.puzzleStatus === 'PASS' && this.props.isCurrentRow ? 'jump' : 'flip')
    }

    return classes.join(' ');
  }

  onChange(value) {

    if ((value.length > 1) || (value === ' ' && !this.props.isSpace) || (value !== ' ' && !value.match(/[A-Za-z]/))) {
      // if (value.length > 1) fixes an android bug (it ignores the maxlength attribute, so we must control it here)
      // space or not a letter
      return;
    }

    this.props.onChange(value.toUpperCase());
  }

  onKeyDown(e) {
    if (this.props.isLastLetter && e.key === 'Enter') {
      this.props.onEnter();
    } else if (e.key === 'Backspace') {
      this.props.onBackspace();
    }
  }

  onMouseDown(e) {
    e.preventDefault();
  }

  getLabel() {

    let label = `Letter #${this.props.letterNumber + 1}`;

    if (this.props.isSpace) {
      label += `: Space`
    } else if (this.props.isRowComplete) {
      label += `: ${getNiceLetterStatus(this.props.status)}`
    }

    return label;
  }

  render() {

    if (this.props.isCurrentRow && this.props.puzzleStatus === 'PASS') {
      // recalculate now that the puzzle is complete (jump)
      this.setAnimationDelay();
    }

    return (
      <div
        className={this.getClass()}
        style={{animationDelay: this.animationDelay}}
      >
        <input
          aria-label={this.getLabel()}
          disabled={this.props.puzzleStatus !== 'IN_PROGRESS'}
          maxLength={1}
          onChange={e => this.onChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          onMouseDown={this.onMouseDown}
          readOnly={this.isSpace || !this.props.focus}
          ref={this.input}
          tabIndex={this.props.focus ? null : -1}
          type={'text'}
          value={this.props.value}
        />
      </div>
    )
  }

}

Letter.propTypes = {
  animate: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired,
  isRowComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  isLastLetter: PropTypes.bool.isRequired,
  isSpace: PropTypes.bool.isRequired,
  letterNumber: PropTypes.number.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  puzzleStatus: PropTypes.string.isRequired,
  triggerFocus: PropTypes.bool.isRequired,
  status: PropTypes.string,
  value: PropTypes.string,
};

export default Letter;
