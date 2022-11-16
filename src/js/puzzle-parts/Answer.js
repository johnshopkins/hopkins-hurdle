import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer }) =>
  <p>Sorry, the correct answer is <strong>{answer}</strong></p>


Answer.propTypes = {
  answer: PropTypes.string.isRequired,
};

export default Answer;
