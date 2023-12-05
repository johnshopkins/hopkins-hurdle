/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Phrase from '../../src/js/puzzle-parts/Phrase';

const getProps = (override) => {
  return {
    correctAnswer: '',
    guess: '',
    isRowComplete: false,
    isCurrentRow: true,
    onFail: () => {},
    onNotWord: () => {},
    onPass: () => {},
    onRefocusComplete: () => {},
    submitButtonActive: false,
    phraseNumber: 1,
    puzzleStatus: 'IN_PROGRESS',
    testing: true,
    triggerFocus: true,
    ...override
  }
};

describe('Phrase', () => {

  describe('constructor', () => {

    test('adds `complete` to aira-labal when a row is complete', () => {

      const props = getProps({ isRowComplete: true });
      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Guess #2: complete')).toBeInTheDocument()

    });

    test('adds `in progress` to aira-labal when a row is in progress', () => {

      const props = getProps({ isCurrentRow: true });
      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Guess #2: in progress')).toBeInTheDocument()

    });

    test('correctly evaluates wrong guess on contruct', () => {

      const props = getProps({
        correctAnswer: 'phone',
        isRowComplete: true,
        guess: 'apple'
      });

      const { getByLabelText } = render(<Phrase {...props} />);

      expect(getByLabelText('Letter #1: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #2: a correct letter, but in wrong position')).toBeInTheDocument();
      expect(getByLabelText('Letter #3: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #4: incorrect')).toBeInTheDocument();
      expect(getByLabelText('Letter #5: correct')).toBeInTheDocument();

    });

    test('correctly evaluates right guess on construct', () => {

      const props = getProps({
        correctAnswer: 'test',
        isRowComplete: true,
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
        correctAnswer: 'TESTING',
        isRowComplete: true,
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
        correctAnswer: 'TESTING',
        isRowComplete: true,
        guess: 'sejtaaa'
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // only first input is able to be edited
      expect(inputs[0]).not.toHaveAttribute('readonly');
      inputs.slice(1).map(input => {
        expect(input).toHaveAttribute('readonly');
      });

    });

  });

  describe('onSubmit', () => {

    test('when a guessed word doesn\'t exist, run onNotWord callback', async () => {

      const onNotWord = jest.fn();

      const props = getProps({
        correctAnswer: 'TESTING',
        guess: '',
        onNotWord: onNotWord,
      });

      const { getAllByLabelText, getByRole } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      await userEvent.type(inputs[0], 's');
      await userEvent.type(inputs[1], 'e');
      await userEvent.type(inputs[2], 'j');
      await userEvent.type(inputs[3], 't');
      await userEvent.type(inputs[4], 'a');
      await userEvent.type(inputs[5], 'a');
      await userEvent.type(inputs[6], 'a');

      await userEvent.click(getByRole('button'));

      expect(onNotWord).toHaveBeenCalledTimes(1);

    });

    test('when an incorrect guess is submitted, run onFail callback', async () => {

      const onFail = jest.fn();

      const props = getProps({
        correctAnswer: 'TESTS',
        guess: '',
        onFail: onFail,
      });

      const { getAllByLabelText, getByRole } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      await userEvent.type(inputs[0], 's');
      await userEvent.type(inputs[1], 'u');
      await userEvent.type(inputs[2], 's');
      await userEvent.type(inputs[3], 'h');
      await userEvent.type(inputs[4], 'i');

      await userEvent.click(getByRole('button'));

      expect(onFail).toHaveBeenCalledTimes(1);

    });

    test('when a correct guess is submitted, run onPass callback', async () => {

      const onPass = jest.fn();

      const props = getProps({
        correctAnswer: 'TESTS',
        guess: '',
        onPass: onPass,
      });

      const { getAllByLabelText, getByRole } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      await userEvent.type(inputs[0], 't');
      await userEvent.type(inputs[1], 'e');
      await userEvent.type(inputs[2], 's');
      await userEvent.type(inputs[3], 't');
      await userEvent.type(inputs[4], 's');

      await userEvent.click(getByRole('button'));

      expect(onPass).toHaveBeenCalledTimes(1);

    });

  });

  describe('onChange and onBackspace', () => {

    test('onChange updates value of inputs', async () => {

      const props = getProps({
        correctAnswer: 'A TEST',
        guess: ''
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // first input is active
      expect(inputs[0]).not.toHaveAttribute('readonly');

      // A is entered
      await userEvent.type(inputs[0], 'a');
      expect(inputs[0]).toHaveValue('A');

      // space is automatically entered
      expect(inputs[1]).toHaveValue(' ');

      // third input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).toHaveAttribute('readonly');
      expect(inputs[2]).not.toHaveAttribute('readonly');

    });

    test('onBackspace updates value of inputs', async () => {

      const props = getProps({
        correctAnswer: 'TEST',
        guess: ''
      });

      const { getAllByLabelText } = render(<Phrase {...props} />);

      const inputs = getAllByLabelText(/Letter #[0-9]+/);

      // first input is active
      expect(inputs[0]).not.toHaveAttribute('readonly');

      await userEvent.type(inputs[0], 't');
      expect(inputs[0]).toHaveValue('T');

      // second input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).not.toHaveAttribute('readonly');

      await userEvent.type(inputs[0], 'e');
      expect(inputs[1]).toHaveValue('E');

      // third input is now active
      expect(inputs[0]).toHaveAttribute('readonly');
      expect(inputs[1]).toHaveAttribute('readonly');
      expect(inputs[2]).not.toHaveAttribute('readonly');

      await userEvent.type(inputs[2], '{backspace}');

      // second input is now active
      expect(inputs[1]).not.toHaveAttribute('readonly');

      // value has been removed
      expect(inputs[1]).toHaveValue('');
    });

  });

  test('focus goes to submit button after all letters are filled out', async () => {

    const props = getProps({
      correctAnswer: 'OK',
      guess: ''
    });

    const { getAllByLabelText, getByRole } = render(<Phrase {...props} />);

    const inputs = getAllByLabelText(/Letter #[0-9]+/);
    const button = getByRole('button');

    // first input can accept input
    expect(inputs[0]).not.toHaveAttribute('readonly');
    expect(inputs[1]).toHaveAttribute('readonly');
    expect(button).toHaveAttribute('disabled');

    // enter letter in first input
    await userEvent.type(inputs[0], 'o');

    // second input can accept input
    expect(inputs[0]).toHaveAttribute('readonly');
    expect(inputs[1]).not.toHaveAttribute('readonly');
    expect(button).toHaveAttribute('disabled');

    // enter letter in second input
    await userEvent.type(inputs[1], 'k');

    // submit button gets focus
    expect(button).toHaveFocus();
    expect(inputs[0]).toHaveAttribute('readonly');
    expect(inputs[1]).toHaveAttribute('readonly');
    expect(button).toHaveFocus();
    expect(button).not.toHaveAttribute('disabled');

    // backspace
    await userEvent.type(inputs[1], '{backspace}');

    // second input gets focus and value is removed
    expect(inputs[1]).not.toHaveAttribute('readonly');
    expect(inputs[1]).toHaveFocus();
    expect(inputs[1]).toHaveValue('');
  });

  test('backspace on first input does nothing', async () => {

    const props = getProps({
      correctAnswer: 'ok',
      guess: ''
    });

    const { getAllByLabelText } = render(<Phrase {...props} />);

    const inputs = getAllByLabelText(/Letter #[0-9]+/);

    // first input is active
    expect(inputs[0]).not.toHaveAttribute('readonly');

    await userEvent.type(inputs[1], '{backspace}');

    // first input is still active
    expect(inputs[0]).not.toHaveAttribute('readonly');

  });

});
