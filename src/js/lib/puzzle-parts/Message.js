import React from 'react';

const Message = ({ hidden, type, message }) => {

  const attributes = {
    'aria-hidden': hidden,
    'aria-label': 'Messages',
    'aria-live': 'polite',
    className: `message ${type}`,
    role: 'region'
  };

  return <div {...attributes}>{message}</div>
};

Message.defaultProps = {
  hidden: false,
  type: 'info',
};

export default Message;
