import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders chat window and message input', () => {
    const { getByText } = render(<App />);
    expect(getByText('Type a message...')).toBeInTheDocument();
  });

  it('sends message when send button is clicked', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);
    expect(getByText('Hello, world!')).toBeInTheDocument();
  });
});
