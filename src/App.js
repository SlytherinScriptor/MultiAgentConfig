import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import axios from 'axios';

const validateInput = (username, message) => {
  if (username.length > 20) {
    throw new Error('Username cannot be longer than 20 characters');
  }
  if (message.trim() === '') {
    throw new Error('Message cannot be empty');
  }
  if (!username) {
    throw new Error('Username is required');
  }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const handleSendMessage = () => {
    try {
      validateInput(username, message);
      const newMessage = { username, message };
      axios.post('/api/messages', newMessage)
        .then(response => {
          setMessages([...messages, response.data]);
          setMessage('');
        })
        .catch(error => {
          setError(error.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    if (newUsername.length > 20) {
      alert('Username cannot be longer than 20 characters');
      return;
    }
    setUsername(newUsername);
  };

  return (
    <div className="app">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ChatWindow messages={messages} username={username} />
      <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
      <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter your username" />
    </div>
  );
}
export default App;
