/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Image from '../../src/js/puzzle-parts/Image';

const getProps = (override) => {
  return {
    alt: null,
    classes: null,
    sizes: null,
    src: null,
    srcet: null,
    ...override
  }
};

describe('Image', () => {

  test('Image renders correctly when only src prop is defined', () => {

    const props = getProps({
      src: 'image.jpg'
    });
    const { getByRole } = render(<Image {...props} />);

    expect(getByRole('img')).toHaveAttribute('src', 'image.jpg');
    expect(getByRole('img')).not.toHaveAttribute('alt');
    expect(getByRole('img')).not.toHaveAttribute('class');
    expect(getByRole('img')).not.toHaveAttribute('sizes');
    expect(getByRole('img')).not.toHaveAttribute('srcset');

  });

  test('Image renders correctly when all props are defined', () => {

    const props = getProps({
      alt: 'alt text',
      classes: 'image column',
      sizes: 'sizes attr',
      src: 'image.jpg',
      srcset: 'srcset attr',
    });
    const { getByRole } = render(<Image {...props} />);

    expect(getByRole('img')).toHaveAttribute('alt', 'alt text');
    expect(getByRole('img')).toHaveAttribute('class', 'image column');
    expect(getByRole('img')).toHaveAttribute('sizes', 'sizes attr');
    expect(getByRole('img')).toHaveAttribute('src', 'image.jpg');
    expect(getByRole('img')).toHaveAttribute('srcset', 'srcset attr');

  });

});
