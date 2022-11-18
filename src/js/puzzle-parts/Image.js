import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ alt, classes, sizes, src, srcset }) => {

  const attributes = {
    src: src
  };

  if (alt) {
    attributes.alt = alt;
  }

  if (classes) {
    attributes.className = classes;
  }

  if (sizes && srcset) {
    attributes.sizes = sizes;
    attributes.srcSet = srcset;
  }

  return <img {...attributes} />;

};

Image.propTypes = {
  alt: PropTypes.string,
  classes: PropTypes.string,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcet: PropTypes.string,
};

export default Image;
