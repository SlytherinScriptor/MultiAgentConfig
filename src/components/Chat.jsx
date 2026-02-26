import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Chat() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://example.com/api/chat', data);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
      alert('Error sending message: ' + error.response.data);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <div className="chat-messages">
        {/* Chat messages will go here */}
      </div>
      <div className="chat-input">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Type a message..." {...register('message')} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;