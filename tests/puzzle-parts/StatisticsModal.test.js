/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import StatisticsModal from '../../src/js/puzzle-parts/StatisticsModal';

const getProps = (override) => {

  const overrideStats = typeof override !== 'undefined' && typeof override.stats === 'object' ? override.stats : {};

  return {
    correctAnswer: 'test',
    onClose: () => { },
    open: true,
    testing: true,
    nextGame: null,
    puzzle: {
      status: 'IN_PROGRESS',
    },
    ...override,
    stats: {
      gamesPlayed: 0,
      gamesWon: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
      winStreak: 0,
      maxStreak: 0,
      ...overrideStats
    },
  };
};

describe('StatisticsModal', () => {

  describe('Statistics calculations', () => {

    test('0 games played', () => {
      const props = getProps();
      const { getByTestId } = render(<StatisticsModal {...props} />);

      expect(getByTestId('gamesPlayed')).toHaveTextContent(/^0$/);
      expect(getByTestId('winPercentage')).toHaveTextContent(/^0%$/);
      expect(getByTestId('winStreak')).toHaveTextContent(/^0$/);
      expect(getByTestId('maxStreak')).toHaveTextContent(/^0$/);
    });

    test('5 games played, none won', () => {
      const props = getProps({
        stats: {
          gamesPlayed: 5
        }
      });
      const { getByTestId } = render(<StatisticsModal {...props} />);

      expect(getByTestId('gamesPlayed')).toHaveTextContent(/^5$/);
      expect(getByTestId('winPercentage')).toHaveTextContent(/^0%$/);
      expect(getByTestId('winStreak')).toHaveTextContent(/^0$/);
      expect(getByTestId('maxStreak')).toHaveTextContent(/^0$/);
    });

    test('10 games played, 8 won', () => {
      const props = getProps({
        stats: {
          gamesPlayed: 10,
          gamesWon: 8,
          winStreak: 2,
          maxStreak: 5
        }
      });
      const { getByTestId } = render(<StatisticsModal {...props} />);

      expect(getByTestId('gamesPlayed')).toHaveTextContent(/^10$/);
      expect(getByTestId('winPercentage')).toHaveTextContent(/^80%$/);
      expect(getByTestId('winStreak')).toHaveTextContent(/^2$/);
      expect(getByTestId('maxStreak')).toHaveTextContent(/^5$/);
    });

    
    test('guess distribution', () => {

      const guessDistribution = [2, 1, 10, 3, 1, 8];

      const props = getProps({
        stats: {
          guessDistribution: guessDistribution,
        }
      });
      const { getByTestId } = render(<StatisticsModal {...props} />);

      guessDistribution.map((number, i) => {
        expect(getByTestId(`guessDistribution-label-${i}`)).toHaveTextContent(new RegExp(`^Games won with ${i + 1} guesses$`));
        expect(getByTestId(`guessDistribution-count-${i}`)).toHaveTextContent(new RegExp(`^${number}$`));
        expect(getByTestId(`guessDistribution-count-${i}`)).toHaveStyle(`width: ${10*number}%`);
      });

    });

  });

  describe('Share', () => {

    test('Show share component when puzzle is complete', () => {
      const props = getProps({
        puzzle: { status: 'PASS' }
      });
      const { getByText } = render(<StatisticsModal {...props} />);

      expect(getByText('Share'));
    });

    test('Do not show share component when puzzle is not complete', () => {
      const props = getProps();
      const { queryByText } = render(<StatisticsModal {...props} />);

      expect(queryByText('Share')).toBeNull();
    });
  });

  describe('Countdown', () => {

    test('Show countdown to next game when there is a next game', () => {
      const props = getProps({
        nextGame: new Date() + 50000
      });
      const { container } = render(<StatisticsModal {...props} />);
      expect(container.querySelector('.countdown')).toHaveTextContent('Next game');
    });

    test('Do not show countdown to next game when there is not a next game', () => {
      const props = getProps();
      const { container } = render(<StatisticsModal {...props} />);
      expect(container.querySelector('.countdown')).toBeNull();
    });

  });

});
