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
    const { getByText } = render(<Answer {...props} />);

    expect(getByText('tastee tape')).toBeInTheDocument();
  });

});
