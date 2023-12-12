/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Message from '../../src/js/puzzle-parts/Message';

const getProps = (override) => {
  return {
    hidden: false,
    message: '',
    ttl: 5000,
    onTtl: () => { },
    ...override
  }
};

describe('Message', () => {

  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  describe('Renders correctly', () => {

    test('default renders correctly', () => {

      const props = getProps({
        message: 'this is the message 1'
      });
      const { getByRole } = render(<Message {...props} />);

      expect(getByRole('log')).toHaveTextContent('this is the message');
      expect(getByRole('log')).toHaveAttribute('class', 'message');
      expect(setTimeout).toHaveBeenCalledTimes(1);

    });

  });

  describe('setTimeout', () => {

    test('onTtl called after custom TTL', () => {

      const onTtl = jest.fn();

      const props = getProps({
        message: 'this is the message 3',
        onTtl: onTtl,
        ttl: 100
      });
      render(<Message {...props} />);

      expect(setTimeout).toHaveBeenCalledTimes(2);
      expect(setTimeout).toHaveBeenLastCalledWith(onTtl, 100);

    });

  });

});
