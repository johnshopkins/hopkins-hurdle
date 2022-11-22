import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Letter extends Component {

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.button = React.createRef();

  }

  componentDidMount() {
    this.maybeFocus();
  }

  componentDidUpdate() {
    this.maybeFocus();
  }

  maybeFocus() {
    if (this.props.focus) {
      this.button.current.focus();

      if (this.props.triggerFocus) {
        this.props.onRefocusComplete();
      }
    }
  }

  onKeyDown(e) {
    if (e.key === 'Backspace') {
      this.props.onBackspace();
    }
  }

  render() {
    return <button
      disabled={!this.props.focus}
      onKeyDown={this.onKeyDown}
      onClick={this.props.onSubmit}
      ref={this.button}
      tabIndex={this.props.focus ? null : -1}
    >Submit</button>
  }

}

Letter.propTypes = {
  focus: PropTypes.bool.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onRefocusComplete: PropTypes.func.isRequired,
  triggerFocus: PropTypes.bool.isRequired,
};

export default Letter;
