import React from 'react';
import { render } from '@testing-library/react';
import MyApp from './_app';

describe('_app', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyApp Component={() => <div>Hello World</div>} pageProps={{}} />);
    expect(getByText('Hello World')).toBeInTheDocument();
  });

  it('renders error message when component throws an error', () => {
    const error = new Error('Test error');
    const Component = () => {
      throw error;
    };
    const { getByText } = render(<MyApp Component={Component} pageProps={{}} />);
    expect(getByText('Error occurred: ' + error.message)).toBeInTheDocument();
  });
});