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
    expect(getByText('Username cannot be empty')).toBeInTheDocument();
  });

  it('does not send message with empty message', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    fireEvent.change(messageInput, { target: { value: '' } });
    fireEvent.click(sendButton);
    expect(getByText('Message cannot be empty')).toBeInTheDocument();
  });

  it('does not send message with username longer than 20 characters', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    const usernameInput = getByPlaceholderText('Enter your username');
    fireEvent.change(usernameInput, { target: { value: 'abcdefghijklmnopqrstuvwxyz' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, world!' } });
    fireEvent.click(sendButton);
    expect(getByText('Username cannot be longer than 20 characters')).toBeInTheDocument();
  });

  it('does not send message with message longer than 1000 characters', () => {
    const { getByText, getByPlaceholderText } = render(<App />);
    const messageInput = getByPlaceholderText('Type a message...');
    const sendButton = getByText('Send');
    fireEvent.change(messageInput, { target: { value: 'a'.repeat(1001) } });
    fireEvent.click(sendButton);
    expect(getByText('Message cannot be longer than 1000 characters')).toBeInTheDocument();
  });
});
