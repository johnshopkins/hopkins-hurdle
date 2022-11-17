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

    const { getByText } = render(<Answer answer={'tastee tape'} />);

    expect(getByText('tastee tape')).toBeInTheDocument();

  });

});
