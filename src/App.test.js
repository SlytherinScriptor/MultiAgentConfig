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

  it('does not send message with empty username', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);
    expect(getByText('Username is required')).toBeInTheDocument();
  });

  it('does not send message with empty message', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const usernameInput = getByPlaceholderText('Enter your username');
    const sendButton = getByText('Send');
    fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
    fireEvent.click(sendButton);
    expect(getByText('Message cannot be empty')).toBeInTheDocument();
  });

  it('does not send message with username longer than 20 characters', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const usernameInput = getByPlaceholderText('Enter your username');
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    fireEvent.change(usernameInput, { target: { value: 'John Doe is a very long username' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);
    expect(getByText('Username cannot be longer than 20 characters')).toBeInTheDocument();
  });
});