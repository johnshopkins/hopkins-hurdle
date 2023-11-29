/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Answer from '../../src/js/puzzle-parts/Answer';

const getProps = (override) => {
  return {
    answer: '',
    ...override
  }
};

describe('Answer', () => {

  test('Given answer is displayed', () => {
    const props = getProps({
      answer: 'tastee tape'
    });
    const { container } = render(<Answer {...props} />);

    const paragraph = container.querySelector('p')
    expect(paragraph.textContent).toBe('The correct answer is tastee tape.')
  });

  test('Given answer is displayed using given template', () => {
    const props = getProps({
      answer: 'tastee tape',
      answerTemplate: 'We were looking for {answer}.'
    });
    const { container } = render(<Answer {...props} />);

    const paragraph = container.querySelector('p')
    expect(paragraph.textContent).toBe('We were looking for tastee tape.')
  });

});
