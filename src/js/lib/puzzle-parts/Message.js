import React, { useEffect } from 'react';
import PropTypes from "prop-types";

const Message = ({ hidden, message, type, ttl, onTtl }) => {

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
  type: PropTypes.string,
  ttl: PropTypes.number,
  onTtl: PropTypes.func.isRequired,
};

export default Message;
