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
    ...override
  }
};

describe('Message', () => {

  jest.useFakeTimers();
  jest.spyOn(global, 'setTimeout');

  describe('Hidden', () => {

    test('Component is hidden when hidden=true', () => {

      const props = getProps({
        hidden: true
      });
      const { getByLabelText } = render(<Message {...props} />);

      expect(getByLabelText('Messages')).toHaveAttribute('aria-hidden', 'true');
      expect(setTimeout).toHaveBeenCalledTimes(0);

    });

    test('Component is not hidden when hidden=false', () => {

      const props = getProps({
        hidden: false
      });
      const { getByLabelText } = render(<Message {...props} />);

      expect(getByLabelText('Messages')).toHaveAttribute('aria-hidden', 'false');

    });

  });

  describe('Renders correctly', () => {

    test('default renders correctly', () => {

      const props = getProps({
        message: 'this is the message 1'
      });
      const { getByLabelText } = render(<Message {...props} />);

      expect(getByLabelText('Messages')).toHaveTextContent('this is the message');
      expect(getByLabelText('Messages')).toHaveAttribute('class', 'message');

    });

  });

});
