import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Letter extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

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
    if (this.props.isSpace) {
      return 'space';
    }

    if (this.props.status) {
      return this.props.status;
    }

    return null;
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
    // this.maybeFocus();
    // this.props.refocus();
  }

  render() {
    return <input
      className={this.getClass()}
      disabled={this.props.isComplete}
      type={'text'}
      maxLength={1}
      onChange={e => this.onChange(e.target.value)}
      onKeyDown={this.onKeyDown}
      onMouseDown={this.onMouseDown}
      pattern="[a-z]"
      ref={this.input}
      // tabIndex={-1}
      value={this.props.value}
    />
  }

}

Letter.propTypes = {
  direction: PropTypes.string.isRequired,
  focus: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  refocus: PropTypes.func.isRequired,
  status: PropTypes.string,
  value: PropTypes.string,
};

export default Letter;
