import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Space extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || ''
    };

    this.onChange = this.onChange.bind(this);

    this.input = React.createRef();

  }

  componentDidMount() {
    this.maybeFocus();
  }

  componentDidUpdate() {
    this.maybeFocus();
  }

  maybeFocus() {
    if (this.props.focus) {
      this.input.current.focus();
    }
  }

  onChange (e) {
    const letter = e.target.value;

    this.setState({ value: letter });

    this.props.onChange(letter);
  }

  render() {
    return <input
      className={'space'}
      disabled={this.props.disabled}
      type={'text'}
      maxLength={1}
      onChange={this.onChange}
      onMouseDown={(e) => e.preventDefault()}
      ref={this.input}
      // tabIndex={-1}
      value=' ' />
  }

}

Space.propTypes = {
  disabled: PropTypes.bool.isRequired,
  // focus: PropTypes.bool.isRequired,
  // value: PropTypes.string,
};

export default Space;
