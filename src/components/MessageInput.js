import React from 'react';
import './MessageInput.css';
function MessageInput({ message, setMessage, handleSendMessage }) {
  return (
    <div className="message-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
export default MessageInput;