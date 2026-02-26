import React from 'react';
import './ChatWindow.css';
function ChatWindow({ messages, username }) {
  return (
    <div className="chat-window">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <span className="username">{message.username}:</span>
          <span className="message-text">{message.message}</span>
        </div>
      ))}
    </div>
  );
}
export default ChatWindow;