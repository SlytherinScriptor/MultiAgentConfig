import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ message, setMessage, handleSendMessage }) {
  const [inputValue, setInputValue] = useState(message);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setMessage(newValue);
  };

  const handleSendMessageClick = () => {
    handleSendMessage();
  };

  return (
    <div className="message-input">
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Type a message..." />
      <button onClick={handleSendMessageClick}>Send</button>
    </div>
  );
}
export default MessageInput;