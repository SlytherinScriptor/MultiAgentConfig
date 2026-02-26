import React from 'react';

function Chat() {
  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-messages">
        {/* Chat messages will go here */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type a message..." />
        <button>Send</button>
      </div>
    </div>
  );
}

export default Chat;