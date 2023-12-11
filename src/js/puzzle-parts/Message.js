import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import '../../css/Message.scss';

const Message = ({ hidden, message, onTtl, screenReaderOnly, ttl }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-live': 'polite',
    className: 'message',
    role: 'log'
  };

  // runs after the component is rendered
  useEffect(() => {
    if (!message || !ttl) {
      return;
    }
    setTimeout(onTtl, ttl);
  });

  return (
    <div {...attributes}>
      {message && (screenReaderOnly ? <p className={'visuallyhidden'}>{message}</p> : <p>{message}</p>)}
    </div>
  );
};

Message.defaultProps = {
  hidden: false,
  screenReaderOnly: false,
  ttl: null,
};

Message.propTypes = {
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onTtl: PropTypes.func.isRequired,
  screenReaderOnly: PropTypes.bool.isRequired,
  ttl: PropTypes.number,
};

export default Message;
