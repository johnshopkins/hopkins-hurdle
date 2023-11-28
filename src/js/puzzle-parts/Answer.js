import React from 'react';
import PropTypes from 'prop-types';

const Answer = ({ answer, answerTemplate }) => {
  const parts = answerTemplate.split('{answer}');
  return <p>{parts[0]}<strong>{answer}</strong>{parts[1]}</p>;
};

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  answerTemplate: PropTypes.string.isRequired,
};

export default Answer;
