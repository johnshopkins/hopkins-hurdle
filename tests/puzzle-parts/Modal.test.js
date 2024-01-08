/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Modal from '../../src/js/puzzle-parts/Modal';

const getProps = (override) => {

  return {
    classes: [],
    label: '',
    onClose: () => { },
    testing: true,
    ...override,
  };
};

describe('Modal', () => {

  describe('Close', () => {

    test('Modal closes when the close button is pressed', async () => {

      const props = getProps({
        label: 'Modal label',
        open: true,
      });
      const { getByRole, queryByRole } = render(<Modal {...props} />);

      // screen.debug()

      expect(getByRole('dialog')).toHaveAttribute('class', 'hh-modal-container');
      expect(getByRole('dialog').parentNode.nodeName).toEqual('BODY')

      await userEvent.click(getByRole('button'));
      expect(queryByRole('dialog')).not.toBeInTheDocument();

    });

    test('Modal closes when the escape key is pressed', async () => {

      const props = getProps({
        label: 'Modal label',
        open: true,
      });
      const { container, getByRole, queryByRole } = render(<Modal {...props} />);

      // screen.debug()

      expect(getByRole('dialog')).toHaveAttribute('class', 'hh-modal-container');
      expect(getByRole('dialog').parentNode.nodeName).toEqual('BODY')

      await userEvent.type(container, '{escape}');
      expect(queryByRole('dialog')).not.toBeInTheDocument();

    });

  });

});
