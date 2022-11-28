/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Utilities from '../../src/js/puzzle-parts/Utilities';

const getProps = (override) => {
  return {
    hidden: false,
    openInfoModal: () => { },
    openStatsModal: () => { },
    ...override
  }
};

describe('Utilities', () => {

  describe('Hidden', () => {

    test('Component is hidden when hidden=true', () => {

      const props = getProps({
        hidden: true
      });
      const { getByLabelText } = render(<Utilities {...props} />);

      expect(getByLabelText('Utilities')).toHaveAttribute('aria-hidden', 'true');

    });

    test('Component is not hidden when hidden=false', () => {

      const props = getProps({
        hidden: false
      });
      const { getByLabelText } = render(<Utilities {...props} />);

      expect(getByLabelText('Utilities')).toHaveAttribute('aria-hidden', 'false');

    });

  });

});
