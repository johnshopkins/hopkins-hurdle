import React from 'react';
import PropTypes from 'prop-types';
import Puzzle from "./Puzzle";

const Answer = ({ answer, answerTemplate }) => {
  const parts = answerTemplate.split('{answer}');
  return <p>{parts[0]}<strong>{answer}</strong>{parts[1]}</p>;
};

Answer.defaultProps = {
  answerTemplate: 'The correct answer is {answer}.',
};

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  answerTemplate: PropTypes.string.isRequired,
};

export default Answer;
