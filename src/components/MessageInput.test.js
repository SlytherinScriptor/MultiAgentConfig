import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MessageInput from './MessageInput';

describe('MessageInput', () => {
  it('renders input field and send button', () => {
    const { getByText, getByPlaceholderText } = render(<MessageInput message="" setMessage={() => {}} handleSendMessage={() => {}} />);
    expect(getByPlaceholderText('Type a message...')).toBeInTheDocument();
    expect(getByText('Send')).toBeInTheDocument();
  });

  it('calls handleSendMessage when send button is clicked', () => {
    const handleSendMessage = jest.fn();
    const { getByText } = render(<MessageInput message="" setMessage={() => {}} handleSendMessage={handleSendMessage} />);
    const sendButton = getByText('Send');
    fireEvent.click(sendButton);
    expect(handleSendMessage).toHaveBeenCalledTimes(1);
  });
});
