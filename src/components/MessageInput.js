import React from 'react';
import './MessageInput.css';

function MessageInput({ message, setMessage, handleSendMessage }) {
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="message-input">
      <input type="text" value={message} onChange={handleInputChange} placeholder="Type a message..." />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
export default MessageInput;