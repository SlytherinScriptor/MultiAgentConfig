import React from 'react';
import { render } from '@testing-library/react';
import ChatWindow from './ChatWindow';

describe('ChatWindow', () => {
  it('renders chat window with messages', () => {
    const messages = [
      { username: 'John Doe', message: 'Hello, world!' },
      { username: 'Jane Doe', message: 'Hi, John!' }
    ];
    const { getByText } = render(<ChatWindow messages={messages} username="John Doe" />);
    expect(getByText('John Doe: Hello, world!')).toBeInTheDocument();
    expect(getByText('Jane Doe: Hi, John!')).toBeInTheDocument();
  });

  it('renders no messages message when messages array is empty', () => {
    const messages = [];
    const { getByText } = render(<ChatWindow messages={messages} username="John Doe" />);
    expect(getByText('No messages yet.')).toBeInTheDocument();
  });
});