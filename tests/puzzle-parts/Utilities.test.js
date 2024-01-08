/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Utilities from '../../src/js/puzzle-parts/Utilities';

import { local as localStorage } from '../../src/js/helpers/storage';
jest.mock('../../src/js/helpers/storage');

const getProps = (override) => {
  return {
    autoInfoModal: true,
    openInfoModal: () => { },
    openStatsModal: () => { },
    testing: true,
    ...override
  }
};

describe('Utilities', () => {

  describe('Information modal', () => {

    test('Modal automatically opens if a user hasn\'t seen it before', async () => {

      const props = getProps();
      const { container, getByRole, queryByRole } = render(<Utilities {...props} />);

      screen.debug();

      // in the document on render
      expect(getByRole('dialog')).toBeInTheDocument();

      // removed when user hits escape
      await userEvent.type(container, '{escape}');
      expect(queryByRole('dialog')).not.toBeInTheDocument();

    });

    test('Modal does not automatically open if a user has already seen it', async () => {

      localStorage.store['hopkinshurdle.seenInfo'] = true;

      const props = getProps();
      const { container, getByRole, queryByRole } = render(<Utilities {...props} />);

      screen.debug();

      // not in the document on render
      expect(queryByRole('dialog')).not.toBeInTheDocument();

      // when user clicks the button, modal opens
      await userEvent.click(getByRole('button'));
      expect(queryByRole('dialog')).toBeInTheDocument();

    });

  });

});
