import React from 'react';
import PropTypes from 'prop-types';

import Image from './Image';

const SupportingContent = ({ hidden, headline, kicker, published, summary, thumbnail, url }) => {
  
  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'See it on the Hub',
    'aria-live': 'polite',
    className: 'supporting-content',
    role: 'region'
  };

  const teaserClasses = ['article', 'teaser'];
  if (thumbnail) {
    teaserClasses.push('has-image');
  }

  return (
    <div {...attributes}>
      <h2>See it on the Hub</h2>
      <div className={teaserClasses.join(' ')}>
        {thumbnail && 
          <div className={'thumbnail'}>
            <a className={'force'} href={url} data-label={headline}>
              <div className={'image column force image-landscape'}>
                <div className={'image-container'}>
                  <Image classes={'column'} {...thumbnail} />
                </div>
              </div>
            </a>
          </div>
        }
        <div className={'text'}>
          <div className={'accent-element'}>
            {kicker && <div className={'kicker'}>{kicker}</div>}
            <h5><a href={url} data-label={headline}>{headline}</a></h5>
            <span className={'visuallyhidden'}>Published</span>
            <span className={'publish-date'}>
              <i className={'fa fa-clock-o'} aria-hidden={true}></i> {published}
            </span>
            <div className={'summary'}>{summary}</div>
          </div>
        </div>
      </div>
    </div>
  );

};

SupportingContent.propTypes = {
  headline: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired,
  kicker: PropTypes.string,
  pulished: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  thumbnail: PropTypes.object,
  url: PropTypes.string.isRequired,
};

export default SupportingContent;
