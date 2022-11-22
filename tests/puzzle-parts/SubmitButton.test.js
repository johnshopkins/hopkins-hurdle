/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import SubmitButton from '../../src/js/puzzle-parts/SubmitButton';

const getProps = (override) => {
  return {
    focus: true,
    onBackspace: () => { },
    onSubmit: () => { },
    onRefocusComplete: () => { },
    triggerFocus: false,
    ...override
  }
};

describe('Button', () => {

  describe('onKeyDown', () => {

    test('when button is clicked, onSubmit callback is called', async () => {

      const onSubmit = jest.fn();

      const props = getProps({
        onSubmit: onSubmit,
      });

      const { getByRole } = render(<SubmitButton {...props} />);

      await userEvent.click(getByRole('button'));

      expect(onSubmit).toHaveBeenCalledTimes(1);

    });

  });

  describe('tabindex', () => {

    test('input with focus does not have tabindex', () => {

      const props = getProps({
        focus: true
      });

      const { getByRole } = render(<SubmitButton {...props} />);

      const input = getByRole('button');
      expect(input).not.toHaveAttribute('tabindex');

    });

    test('input without focus has tabindex of -1', () => {

      const props = getProps({
        focus: false
      });

      const { getByRole } = render(<SubmitButton {...props} />);

      const input = getByRole('button');
      expect(input).toHaveAttribute('tabindex', '-1');

    });

  });

  describe('focus', () => {

    test('focus input', () => {

      const props = getProps({
        focus: true
      });

      const { getByRole } = render(<SubmitButton {...props} />);

      const input = getByRole('button');
      expect(input).toHaveFocus();

    });

    test('refocus', () => {

      const onRefocusComplete = jest.fn();

      const props = getProps({
        focus: true,
        onRefocusComplete: onRefocusComplete,
        triggerFocus: true,
      });

      render(<SubmitButton {...props} />);

      expect(onRefocusComplete).toHaveBeenCalledTimes(1);

    });

  });

});
