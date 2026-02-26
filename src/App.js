import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import axios from 'axios';
import DOMPurify from 'dompurify';

const validateInput = (username, message) => {
  if (username === null || username === undefined) {
    throw new Error('Username cannot be null or undefined');
  }
  if (message === null || message === undefined) {
    throw new Error('Message cannot be null or undefined');
  }
  if (username.length > 20) {
    throw new Error('Username cannot be longer than 20 characters');
  }
  if (username.trim() === '') {
    throw new Error('Username cannot be empty');
  }
  if (message.trim() === '') {
    throw new Error('Message cannot be empty');
  }
};

function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) return;
    axios.get('/api/messages', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        setError(error.response ? error.response.data : error.message);
      });
  }, [token]);

  const handleSendMessage = () => {
    if (isSending) return;
    setIsSending(true);
    try {
      validateInput(username, message);
      const newMessage = { username: DOMPurify.sanitize(username), message: DOMPurify.sanitize(message) };
      axios.post('/api/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setMessages([...messages, response.data]);
          setMessage('');
          setIsSending(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            setError('You are not authorized to send messages');
          } else {
            setError(error.response ? error.response.data : error.message);
          }
          setIsSending(false);
        });
    } catch (error) {
      setError(error.message);
      setIsSending(false);
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="app">
      <ChatWindow messages={messages} />
      <MessageInput
        username={username}
        message={message}
        onUsernameChange={handleUsernameChange}
        onMessageChange={(event) => setMessage(event.target.value)}
        onSendMessage={handleSendMessage}
        error={error}
        isSending={isSending}
      />
    </div>
  );
}

export default App;