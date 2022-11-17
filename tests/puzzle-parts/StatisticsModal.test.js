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
    onClose: () => { },
    open: true,
    testing: true,
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

  describe('Show or hide', () => {

    test('Component is hidden when open=false', () => {

      const props = getProps({
        open: false
      });
      const { getByLabelText } = render(<StatisticsModal {...props} />);

      expect(getByLabelText('Statistics')).toHaveAttribute('class', 'stats');
      expect(document.body).not.toHaveAttribute('class');

    });

    test('Component is shown when open=true', () => {

      document.body.setAttribute('class', 'test');

      const props = getProps();
      const { getByLabelText } = render(<StatisticsModal {...props} />);

      expect(getByLabelText('Statistics')).toHaveAttribute('class', 'stats open');
      expect(document.body).toHaveAttribute('class', 'test modal-open');

    });

  });

  describe('Close', () => {

    test('Calls onClose callback when close button is pressed', async () => {

      const onClose = jest.fn();

      const props = getProps({
        onClose: onClose
      });
      const { getByLabelText, getByRole } = render(<StatisticsModal {...props} />);

      expect(getByLabelText('Statistics')).toHaveAttribute('class', 'stats open');
      expect(document.body).toHaveAttribute('class', 'test modal-open');

      await userEvent.click(getByRole('button'));
      expect(onClose).toHaveBeenCalledTimes(1);

    });

  });

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

});
