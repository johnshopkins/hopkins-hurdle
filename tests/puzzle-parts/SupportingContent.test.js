/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import SupportingContent from '../../src/js/puzzle-parts/SupportingContent';

const getProps = (override) => {
  return {
    headline: 'This is a headline',
    hidden: false,
    kicker: null,
    pulished: 'May 10, 2010',
    summary: 'This is a summary',
    thumbnail: null,
    url: 'https://hub.jhu.edu',
    ...override,
  }
};

describe('SupportingContent', () => {

  describe('Hidden', () => {

    test('Component is hidden when hidden=true', () => {

      const props = getProps({
        hidden: true
      });
      const { getByLabelText } = render(<SupportingContent {...props} />);

      expect(getByLabelText('See it on the Hub')).toHaveAttribute('aria-hidden', 'true');

    });

    test('Component is not hidden when hidden=false', () => {

      const props = getProps({
        hidden: false
      });
      const { getByLabelText } = render(<SupportingContent {...props} />);

      expect(getByLabelText('See it on the Hub')).toHaveAttribute('aria-hidden', 'false');

    });

  });

  describe('Teaser', () => {

    describe('Thumbnails', () => {

      test('Teaser without thumbnail does not get `has-image` class', () => {

        const props = getProps();
        const { container } = render(<SupportingContent {...props} />);
        const teaser = container.querySelector('.teaser');

        expect(teaser).toHaveAttribute('class', 'article teaser');

      });

      test('Teaser without thumbnail does not have `.thumbnail` div', () => {

        const props = getProps();
        const { container } = render(<SupportingContent {...props} />);
        const teaser = container.querySelector('.thumbnail');

        expect(teaser).not.toBeInTheDocument();

      });

      test('Teaser with thumbnail has `.thumbnail` div', () => {

        const props = getProps({
          thumbnail: {}
        });
        const { container } = render(<SupportingContent {...props} />);
        const teaser = container.querySelector('.teaser');

        expect(teaser).toBeInTheDocument();

      });

      test('Thumbnail div is constructed correctly', () => {

        const props = getProps({
          url: 'the url',
          thumbnail: {
            srcset: 'thesrcset',
            sizes: 'thesizes',
            url: 'theurl',
            alt_text: 'thealttext',
          }
        });
        const { container, getByRole } = render(<SupportingContent {...props} />);

        const thumbnailLink = container.querySelector('.thumbnail a');
        expect(thumbnailLink).toBeInTheDocument();

        expect(getByRole('img')).toBeInTheDocument();
        expect(getByRole('img')).toHaveAttribute('class', 'column');
        expect(getByRole('img')).toHaveAttribute('src', 'theurl');
        expect(getByRole('img')).toHaveAttribute('alt', 'thealttext');
        expect(getByRole('img')).toHaveAttribute('sizes', 'thesizes');
        expect(getByRole('img')).toHaveAttribute('srcset', 'thesrcset');

      });

    });

    describe('Text content', () => {

      test('Teasers with a kicker display the kicker', () => {

        const props = getProps({
          kicker: 'the kicker'
        });
        const { container } = render(<SupportingContent {...props} />);
        const kicker = container.querySelector('.teaser .kicker');

        expect(kicker).toBeInTheDocument();
        expect(kicker).toHaveTextContent('the kicker');

      });

      test('Required display fields display correctly', () => {

        const props = getProps({
          headline: 'the headline',
          published: 'the publish date',
          summary: 'the summary',
          url: 'the url',
        });
        const { container, getByRole } = render(<SupportingContent {...props} />);

        const heading = container.querySelector('h5');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent('the headline');

        const headingLink = container.querySelector('h5 a');
        expect(headingLink).toBeInTheDocument();
        expect(headingLink).toHaveAttribute('href', 'the url');
        expect(headingLink).toHaveAttribute('data-label', 'the headline');

        const publishDate = container.querySelector('.publish-date');
        expect(publishDate).toBeInTheDocument();
        expect(publishDate).toHaveTextContent('the publish date');

        const summary = container.querySelector('.summary');
        expect(summary).toBeInTheDocument();
        expect(summary).toHaveTextContent('the summary');

      });

    });

  });

});
