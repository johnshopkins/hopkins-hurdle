/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Phrase from './Phrase';

const getProps = (override) => {
  return {
    correctAnswer: '',
    displayMessage: () => {},
    guess: '',
    isComplete: false,
    isCurrentRow: true,
    onFail: () => {},
    onPass: () => {},
    onRefocusComplete: () => {},
    phraseNumber: 1,
    triggerFocus: true,
    ...override
  }
};

describe('Phrase', () => {

  describe('constructor', () => {

    test('adds `complete` to aira-labal when a row is complete', () => {

      const props = getProps({ isComplete: true });
      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Guess 2: complete')).toBeInTheDocument()

    });

    test('adds `in progress` to aira-labal when a row is in progress', () => {

      const props = getProps({ isCurrentRow: true });
      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Guess 2: in progress')).toBeInTheDocument()

    });

    test('correctly evaluates wrong guess on contruct', () => {

      const props = getProps({
        correctAnswer: 'testing',
        isComplete: true,
        guess: 'sejtaaa'
      });

      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Letter #1: correct letter, but in wrong position')).toBeInTheDocument();
      expect(getByLabelText('Letter #2: correct')).toBeInTheDocument();
      expect(getByLabelText('Letter #3: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #4: correct')).toBeInTheDocument();
      expect(getByLabelText('Letter #5: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #6: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #7: incorrect')).toBeInTheDocument();

    });

    test('correctly evaluates right guess on contruct', () => {

      const props = getProps({
        correctAnswer: 'test',
        isComplete: true,
        guess: 'test'
      });
      
      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Letter #1: correct')).toBeInTheDocument();
      expect(getByLabelText('Letter #2: correct')).toBeInTheDocument();
      expect(getByLabelText('Letter #3: correct')).toBeInTheDocument();
      expect(getByLabelText('Letter #4: correct')).toBeInTheDocument();

    });

    test('creates the proper number of letter components on contruct', () => {

      const props = getProps({
        correctAnswer: 'testing stuff'
      });

      render(<Phrase {...props} />);

      const letters = screen.getAllByLabelText(/^Letter #[0-9]+$/)
      expect(letters).toHaveLength(12);

      const spaces = screen.getAllByLabelText(/^Letter #[0-9]+: Space$/)
      expect(spaces).toHaveLength(1);

    });

  });

  describe('render', () => {

    test('completed row cannot be altered', () => {

      const props = getProps({
        correctAnswer: 'testing',
        isComplete: true,
        guess: 'sejtaaa'
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      inputs.slice(1).map(input => {
        expect(input).toHaveAttribute('readonly');
      });

    });

    test('in progress row can be altered, starting with the first letter', () => {

      const props = getProps({
        correctAnswer: 'testing',
        isComplete: true,
        guess: 'sejtaaa'
      });

      const { getAllByLabelText, rerender } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // only first input is able to be edited
      expect(inputs[0]).not.toHaveAttribute('readonly');
      inputs.slice(1).map(input => {
        expect(input).toHaveAttribute('readonly');
      });

    });

  });

  describe('onEnter', () => {

    test('when not enough letters is submitted, display error message', () => {

      const displayMessage = jest.fn();

      const props = getProps({
        correctAnswer: 'testing',
        displayMessage: displayMessage,
        guess: 'test',
      });

      const { getByLabelText } = render(<Phrase {...props} />);

      // fire Enter key press on last input
      fireEvent.keyDown(getByLabelText('Letter #7'), {
        key: 'Enter',
        code: 13,
        charCode: 13
      });

      expect(displayMessage).toHaveBeenCalledTimes(1);

    });

    test('when an incorrect guess is submitted, run onFail callback', () => {

      const onFail = jest.fn();

      const props = getProps({
        correctAnswer: 'testing',
        guess: 'sejtaaa',
        onFail: onFail,
      });

      const { getByLabelText } = render(<Phrase {...props} />);

      // fire Enter key press on last input
      fireEvent.keyDown(getByLabelText('Letter #7'), {
        key: 'Enter',
        code: 13,
        charCode: 13
      });

      expect(onFail).toHaveBeenCalledTimes(1);

    });

    test('when a correct guess is submitted, run onPass callback', () => {

      const onPass = jest.fn();

      const props = getProps({
        correctAnswer: 'testing',
        guess: 'testing',
        onPass: onPass,
      });

      const { getByLabelText } = render(<Phrase {...props} />);

      // fire Enter key press on last input
      fireEvent.keyDown(getByLabelText('Letter #7'), {
        key: 'Enter',
        code: 13,
        charCode: 13
      });

      expect(onPass).toHaveBeenCalledTimes(1);

    });

  });

  describe('onChange and onBackspace', () => {

    test('onChange updates value of inputs', () => {

      const props = getProps({
        correctAnswer: 'a test',
        guess: ''
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // first input is active
      expect(inputs[0]).not.toHaveAttribute('readonly');

      // A is entered
      fireEvent.change(inputs[0], { target: { value: 'a' } });
      expect(inputs[0]).toHaveValue('A');

      // space is automatically entered
      expect(inputs[1]).toHaveValue(' ');

      // third input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).toHaveAttribute('readonly');
      expect(inputs[2]).not.toHaveAttribute('readonly');

    });

    test('onBackspace updates value of inputs', () => {

      const props = getProps({
        correctAnswer: 'test',
        guess: ''
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // first input is active
      expect(inputs[0]).not.toHaveAttribute('readonly');

      fireEvent.change(inputs[0], { target: { value: 't' } });
      expect(inputs[0]).toHaveValue('T');

      // second input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).not.toHaveAttribute('readonly');

      fireEvent.change(inputs[1], { target: { value: 'e' } });
      expect(inputs[1]).toHaveValue('E');

      // third input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).toHaveAttribute('readonly');
      expect(inputs[2]).not.toHaveAttribute('readonly');

      fireEvent.keyDown(inputs[2], {
        key: 'Backspace',
        code: 8,
        charCode: 8
      });

      // second input is now active
      expect(inputs[1]).not.toHaveAttribute('readonly');

      // value has been removed
      expect(inputs[1]).toHaveValue('');
    });

  });

  test('backspace on last input does not move focus', () => {

    const props = getProps({
      correctAnswer: 'ok',
      guess: ''
    });

    const { getAllByLabelText } = render(<Phrase {...props} />);

    const inputs = getAllByLabelText(/Letter #[0-9]+/);

    // enter letter in each input
    fireEvent.change(inputs[0], { target: { value: 'o' } });
    fireEvent.change(inputs[1], { target: { value: 'k' } });

    fireEvent.keyDown(inputs[1], {
      key: 'Backspace',
      code: 8,
      charCode: 8
    });

    // second input is still active
    expect(inputs[1]).not.toHaveAttribute('readonly');

    // second input value has been removed
    expect(inputs[1]).toHaveValue('');

  });

  test('backspace on first input does nothing', () => {

    const props = getProps({
      correctAnswer: 'ok',
      guess: ''
    });

    const { getAllByLabelText } = render(<Phrase {...props} />);

    const inputs = getAllByLabelText(/Letter #[0-9]+/);

    // first input is active
    expect(inputs[0]).not.toHaveAttribute('readonly');

    fireEvent.keyDown(inputs[1], {
      key: 'Backspace',
      code: 8,
      charCode: 8
    });

    // first input is still active
    expect(inputs[0]).not.toHaveAttribute('readonly');

  });

});
