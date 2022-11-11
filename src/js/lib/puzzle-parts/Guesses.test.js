/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Guesses from './Guesses';

const getProps = (override) => {
  return {
    answerDescription: '2 letters, followed by a space, followed by 4 letters',
    currentRow: 0,
    correctAnswer: 'ok cool',
    displayMessage: () => { },
    guesses: ['', '', '', '', '', ''],
    hidden: false,
    onGuessFail: () => { },
    onPuzzlePass: () => { },
    remainingGuesses: 6,
    status: 'IN_PROGRESS',
    ...override
  }
};

describe('Guesses', () => {

  describe('Answer description', () => {

    test('answer description is accurate', () => {

      const props = getProps();
      const { getByText } = render(<Guesses {...props} />);

      expect(getByText('The answer consists of 2 letters, followed by a space, followed by 4 letters. You have 6 guesses remaining.')).toBeInTheDocument();

    });

    test('number of guesses left (more than 1)', () => {

      const props = getProps({ remainingGuesses: 4 });
      const { getByText } = render(<Guesses {...props} />);

      expect(getByText('The answer consists of 2 letters, followed by a space, followed by 4 letters. You have 4 guesses remaining.')).toBeInTheDocument();

    });

    test('number of guesses left (1)', () => {

      const props = getProps({ remainingGuesses: 1 });
      const { getByText } = render(<Guesses {...props} />);

      expect(getByText('The answer consists of 2 letters, followed by a space, followed by 4 letters. You have 1 guess remaining.')).toBeInTheDocument();

    });

    test('number of guesses left (0)', () => {

      const props = getProps({ remainingGuesses: 0 });
      const { getByText } = render(<Guesses {...props} />);

      expect(getByText('The answer consists of 2 letters, followed by a space, followed by 4 letters. You have 0 guesses remaining.')).toBeInTheDocument();

    });

  });

  describe('Phrases', () => {

    test('creates the correct number of phrase components', () => {

      const props = getProps({ remainingGuesses: 4 });
      const { getAllByLabelText } = render(<Guesses {...props} />);

      const inputs = getAllByLabelText(/Guess #[0-9]/);
      expect(inputs).toHaveLength(6);

    });

  });

  describe('Refocus', () => {

    test('when component is clicked, trigger a refocus', async () => {

      const props = getProps({
        currentRow: 1
      });
      const { getByLabelText, getByRole } = render(<Guesses {...props} />);

      // initially, the first letter of the second guess has focus
      const secondGuess = getByLabelText('Guess #2: in progress');
      const letter = within(secondGuess).getByLabelText('Letter #1');
      expect(letter).toHaveFocus();

      // clicking outside this component removes focus
      await userEvent.click(document.body);
      expect(letter).not.toHaveFocus();

      // clicking inside Guesses returns focus
      await userEvent.click(getByRole('heading'));
      expect(letter).toHaveFocus();

    });

  });

});
