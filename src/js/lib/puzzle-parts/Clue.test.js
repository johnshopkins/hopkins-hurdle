/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Clue from './Clue';

const getProps = (override) => {
  return {
    clue: {},
    currentRow: 0,
    hidden: false,
    ...override
  }
};

describe('Clue', () => {

  test('Clue with only text displays correctly', () => {

    const props = getProps({
      clue: {
        text: 'this is the clue'
      }
    });

    const { container } = render(<Clue {...props} />);    

    expect(container.querySelector('h2')).toHaveTextContent('Clue #1');
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('p')).toHaveTextContent('this is the clue');
    expect(container).not.toHaveAttribute('aria-hidden');

  });

  test('Clue with only image displays correctly', () => {

    const props = getProps({
      clue: {
        photo: {
          url: 'image.jpg',
          alt_text: 'alt text'
        }
      },
      currentRow: 1
    });

    const { container, getByRole } = render(<Clue {...props} />);

    expect(container.querySelector('h2')).toHaveTextContent('Clue #2');
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'image.jpg');
    expect(getByRole('img')).toHaveAttribute('alt', 'alt text');
    expect(container.querySelector('p')).toBeNull();

  });

  test('Clue with text and image displays correctly', () => {

    const props = getProps({
      clue: {
        photo: {
          url: 'image1.jpg',
          alt_text: 'alt text1'
        },
        text: 'this is the clue1'
      },
      currentRow: 2,
    });

    const { container, getByRole } = render(<Clue {...props} />);

    expect(container.querySelector('h2')).toHaveTextContent('Clue #3');
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src', 'image1.jpg');
    expect(getByRole('img')).toHaveAttribute('alt', 'alt text1');
    expect(container.querySelector('p')).toHaveTextContent('this is the clue1');
    expect(container).not.toHaveAttribute('aria-hidden');

  });

  test('Hidden clue is hidden', () => {

    const props = getProps({
      hidden: true
    });

    const { getByLabelText } = render(<Clue {...props} />);

    expect(getByLabelText('Clue')).toHaveAttribute('aria-hidden');

  });

});
