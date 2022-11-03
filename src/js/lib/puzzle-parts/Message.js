import React from 'react';

const Message = ({ type, message }) => {

  const attributes = {
    'aria-label': 'Messages',
    'aria-live': 'polite',
    className: `message ${type}`,
    role: 'region'
  };

  return <div {...attributes}>{message}</div>
};

Message.defaultProps = {
  type: 'info'
};

export default Message;
