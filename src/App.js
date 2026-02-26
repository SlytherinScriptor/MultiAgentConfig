import React, { useState, useEffect } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
function App() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Initialize username
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { username, message }]);
      setMessage('');
    }
  };
  return (
    <div className="app">
      <ChatWindow messages={messages} username={username} />
      <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
    </div>
  );
}
export default App;