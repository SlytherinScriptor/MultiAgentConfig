import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

describe('index', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to WebApp')).toBeInTheDocument();
  });

  it('renders error message when component throws an error', () => {
    const error = new Error('Test error');
    jest.spyOn(console, 'error');
    const HomeComponent = () => {
      throw error;
    };
    const { getByText } = render(<HomeComponent />);
    expect(getByText('Error occurred: ' + error.message)).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith('Error in index.js:', error);
  });
});