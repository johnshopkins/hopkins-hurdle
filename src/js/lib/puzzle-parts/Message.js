import React from 'react';

const Message = ({ type, message }) => <div className={`message ${type}`}>{message}</div>;

Message.defaultProps = {
  type: 'info'
};

export default Message;
