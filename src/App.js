import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSendMessage = () => {
    try {
      if (username.length > 20) {
        throw new Error('Username cannot be longer than 20 characters');
      }
      if (message.trim() === '') {
        throw new Error('Message cannot be empty');
      }
      if (!username) {
        throw new Error('Username is required');
      }
      const newMessage = { username, message };
      axios.post('/api/messages', newMessage)
        .then(response => {
          setMessages([...messages, response.data]);
          setMessage('');
        })
        .catch(error => {
          console.error(error);
        });
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