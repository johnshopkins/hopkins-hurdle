import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Letter extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.input = React.createRef();

  }

  componentDidMount() {
    this.maybeFocus();
  }

  componentDidUpdate(prevProps, prevState) {
    this.maybeFocus();
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
    }

    return classes.join(' ');
  }

  onChange(value) {
    if (value === '') {
      return;
    }

    this.props.onChange(value);
  }

  onKeyDown(e) {
    if (e.key === 'Enter') {
      this.props.onEnter();
    } else if (e.key === 'Backspace') {
      this.props.onBackspace();
    }
  }

  onMouseDown(e) {
    e.preventDefault();
  }

  render() {

    const animationDelay = (100 * this.props.letterNumber) + 'ms';

    return <input
      className={this.getClass()}
      disabled={this.props.isComplete}
      maxLength={1}
      onChange={e => this.onChange(e.target.value)}
      onKeyDown={this.onKeyDown}
      onMouseDown={this.onMouseDown}
      pattern="[a-z]"
      ref={this.input}
      style={{animationDelay: animationDelay}}
      tabIndex={this.props.isComplete || !this.props.isCurrentRow ? -1 : null}
      type={'text'}
      value={this.props.value}
    />
  }

}

Letter.propTypes = {
  animate: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired,
  letterNumber: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrentRow: PropTypes.bool.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  triggerFocus: PropTypes.bool.isRequired,
  status: PropTypes.string,
  value: PropTypes.string,
};

export default Letter;
