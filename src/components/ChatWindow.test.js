import React from 'react';
import { render } from '@testing-library/react';
import ChatWindow from './ChatWindow';

describe('ChatWindow', () => {
  it('renders messages', () => {
    const messages = [
      { username: 'John', message: 'Hello, world!' },
      { username: 'Jane', message: 'Hi, John!' },
    ];
    const { getByText } = render(<ChatWindow messages={messages} username="John" />);
    expect(getByText('John: Hello, world!')).toBeInTheDocument();
    expect(getByText('Jane: Hi, John!')).toBeInTheDocument();
  });
});
