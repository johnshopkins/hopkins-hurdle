import React from 'react';
import PropTypes from 'prop-types';

import '../../css/Message.scss';

const Message = ({ hidden, message, onTtl, screenReaderOnly, ttl }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Messages',
    'aria-live': 'assertive',
    className: 'message',
    role: 'region'
  };

  return (
    <div {...attributes}>
      {screenReaderOnly ? <div className={'visuallyhidden'}>{message}</div> : message}
    </div>
  );
};

Message.defaultProps = {
  hidden: false,
  screenReaderOnly: false,
};

Message.propTypes = {
  hidden: PropTypes.bool.isRequired,
  message: PropTypes.string,
  screenReaderOnly: PropTypes.bool.isRequired,
};

export default Message;
