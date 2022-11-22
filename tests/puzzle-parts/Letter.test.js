/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Letter from '../../src/js/puzzle-parts/Letter';

const getProps = (override) => {
  return {
    animate: false,
    direction: 'forward',
    focus: false,
    isComplete: false,
    isCurrentRow: false,
    isSpace: false,
    letterNumber: 0,
    onBackspace: () => { },
    onEnter: () => { },
    onChange: () => { },
    onRefocusComplete: () => { },
    triggerFocus: false,
    status: null,
    value: '',
    ...override
  }
};

describe('Letter', () => {

  describe('onChange', () => {

    test('onChange fires when value of input changes', async () => {

      const onChange = jest.fn();

      const props = getProps({
        focus: true,
        onChange: onChange,
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');

      await userEvent.type(input, 'a');

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('A');

    });

    test('onChange does not fire when value is not alpha', async () => {

      const onChange = jest.fn();

      const props = getProps({
        focus: true,
        onChange: onChange,
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');

      await userEvent.type(input, '1');
      await userEvent.type(input, '!');
      await userEvent.type(input, ' ');

      expect(onChange).toHaveBeenCalledTimes(0);

    });

    test('onChange fires when props.isSpace and value is a space', () => {

      const onChange = jest.fn();

      const props = getProps({
        isSpace: true,
        onChange: onChange,
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');

      fireEvent.change(input, { target: { value: ' ' } });

      expect(onChange).toHaveBeenCalledTimes(1);
      
    });

  });

  describe('onKeyDown', () => {

    test('when delete is pressed, onBackspace callback is called', async () => {

      const onBackspace = jest.fn();

      const props = getProps({
        focus: true,
        onBackspace: onBackspace,
      });

      const { getByRole } = render(<Letter {...props} />);

      await userEvent.type(getByRole('textbox'), '{backspace}');

      expect(onBackspace).toHaveBeenCalledTimes(1);

    });

  });

  describe('label', () => {

    test('pass status yeilds `correct` label', () => {

      const props = getProps({
        isComplete: true,
        status: 'pass',
      });

      const { getByLabelText } = render(<Letter {...props} />);

      expect(getByLabelText('Letter #1: correct')).toBeInTheDocument()

    });

    test('fail status yeilds `incorrect` label', () => {

      const props = getProps({
        isComplete: true,
        status: 'fail',
      });

      const { getByLabelText } = render(<Letter {...props} />);

      expect(getByLabelText('Letter #1: incorrect')).toBeInTheDocument()

    });

    test('shuffle status yeilds `correct letter, but in wrong position` label', () => {

      const props = getProps({
        isComplete: true,
        status: 'shuffle',
      });

      const { getByLabelText } = render(<Letter {...props} />);

      expect(getByLabelText('Letter #1: correct letter, but in wrong position')).toBeInTheDocument()

    });

    test('In-progress letter yeilds `Letter #1` label', () => {

      const props = getProps();

      const { getByLabelText } = render(<Letter {...props} />);

      expect(getByLabelText('Letter #1')).toBeInTheDocument()

    });

    test('Space yeilds `Letter #1: Space` label', () => {

      const props = getProps({
        isSpace: true
      });

      const { getByLabelText } = render(<Letter {...props} />);

      expect(getByLabelText('Letter #1: Space')).toBeInTheDocument()

    });

  });

  describe('tabindex', () => {

    test('input with focus does not have tabindex', () => {

      const props = getProps({
        focus: true
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).not.toHaveAttribute('tabindex');

    });

    test('input without focus has tabindex of -1', () => {

      const props = getProps({
        focus: false
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('tabindex', '-1');

    });

  });

  describe('animation', () => {

    test('first input has the correct animation delay', () => {

      const props = getProps({
        letterNumber: 0
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('style', 'animation-delay: 0ms;');

    });

    test('third input has the correct animation delay', () => {

      const props = getProps({
        letterNumber: 2
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('style', 'animation-delay: 200ms;');

    });

  });

  describe('classes', () => {
  
    test('space has `space` class', () => {

      const props = getProps({
        isSpace: true
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('class', 'space');

    });

    test('complete, correct input has `pass` class', () => {

      const props = getProps({
        status: 'pass'
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('class', 'pass');

    });

    test('complete, wrong input has `fail` class', () => {

      const props = getProps({
        status: 'fail'
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('class', 'fail');

    });

    test('complete, input that needs shuffle has `shuffle` class', () => {

      const props = getProps({
        status: 'shuffle'
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('class', 'shuffle');

    });

    test('input set to animate has `animate class', () => {

      const props = getProps({
        animate: true
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveAttribute('class', 'animate');

    });
  });

  describe('focus', () => {

    test('focus input', () => {

      const props = getProps({
        focus: true
      });

      const { getByRole } = render(<Letter {...props} />);

      const input = getByRole('textbox');
      expect(input).toHaveFocus();

    });

    test('refocus', () => {

      const onRefocusComplete = jest.fn();

      const props = getProps({
        focus: true,
        onRefocusComplete: onRefocusComplete,
        triggerFocus: true,
      });

      render(<Letter {...props} />);

      expect(onRefocusComplete).toHaveBeenCalledTimes(1);

    });

    test('when newly focused input is space, automatically fill', () => {

      const onChange = jest.fn();

      const props = getProps({
        direction: 'forward',
        focus: true,
        isSpace: true,
        onChange: onChange
      });

      render(<Letter {...props} />);

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(' ');

    });

    test('when newly focused input (from backspace) is space, backspace again', () => {

      const onBackspace = jest.fn();

      const props = getProps({
        direction: 'backward',
        focus: true,
        isSpace: true,
        onBackspace: onBackspace
      });

      render(<Letter {...props} />);

      expect(onBackspace).toHaveBeenCalledTimes(1);

    });

  });

});
