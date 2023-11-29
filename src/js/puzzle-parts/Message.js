import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import '../../css/Message.scss';

const Message = ({ hidden, message, onTtl, ttl, type }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Messages',
    'aria-live': 'polite',
    className: `message ${type}`,
    role: 'region'
  };

  // runs after the component is rendered
  useEffect(() => {
    if (!message) {
      return;
    }
    setTimeout(onTtl, ttl);
  });

  return <div {...attributes}>{message}</div>
};

Message.defaultProps = {
  hidden: false,
  type: 'info',
  ttl: 5000
};

Message.propTypes = {
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onTtl: PropTypes.func.isRequired,
  ttl: PropTypes.number,
  type: PropTypes.string,
};

export default Message;
