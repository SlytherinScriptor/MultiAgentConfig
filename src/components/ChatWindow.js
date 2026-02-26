import React from 'react';
import './ChatWindow.css';

function ChatWindow({ messages, username }) {
  if (messages.length === 0) {
    return (
      <div className="chat-window">
        <p>No messages yet.</p>
      </div>
    );
  }

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