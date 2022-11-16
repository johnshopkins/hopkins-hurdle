/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Message from './Message';

const getProps = (override) => {
  return {
    hidden: false,
    message: '',
    type: 'info',
    ttl: 5000,
    onTtl: () => { },
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
      expect(getByLabelText('Messages')).toHaveAttribute('class', 'message info');
      expect(setTimeout).toHaveBeenCalledTimes(1);

    });

    test('error renders correctly', () => {

      const props = getProps({
        message: 'this is the message 2',
        type: 'error'
      });
      const { getByLabelText } = render(<Message {...props} />);

      expect(getByLabelText('Messages')).toHaveTextContent('this is the message');
      expect(getByLabelText('Messages')).toHaveAttribute('class', 'message error');
      expect(setTimeout).toHaveBeenCalledTimes(2);

    });

  });

  describe('setTimeout', () => {

    test('onTtl called after default TTL', () => {

      const onTtl = jest.fn();

      const props = getProps({
        message: 'this is the message 3',
        onTtl: onTtl
      });
      const { getByLabelText } = render(<Message {...props} />);


      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenLastCalledWith(onTtl, 5000);

    });

    test('onTtl called after custom TTL', () => {

      const onTtl = jest.fn();

      const props = getProps({
        message: 'this is the message 3',
        onTtl: onTtl,
        ttl: 100
      });
      const { getByLabelText } = render(<Message {...props} />);


      expect(setTimeout).toHaveBeenCalledTimes(4);
      expect(setTimeout).toHaveBeenLastCalledWith(onTtl, 100);

    });

  });

});
