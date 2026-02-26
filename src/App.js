import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username');
    return storedUsername ? storedUsername : '';
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    try {
      if (message.trim() !== '') {
        if (!username) {
          throw new Error('Username is required');
        }
        setMessages([...messages, { username, message }]);
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    if (newUsername.length > 20) {
      alert('Username cannot be longer than 20 characters');
      return;
    }
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  return (
    <div className="app">
      <ChatWindow messages={messages} username={username} />
      <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
    </div>
  );
}
export default App;
