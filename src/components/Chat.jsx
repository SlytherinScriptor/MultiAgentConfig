
import React from 'react';
import { useForm } from 'react-hook-form';

function Chat() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
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
