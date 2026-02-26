import React from 'react';
import { render } from '@testing-library/react';
import MyApp from './_app';
import * as Sentry from '@sentry/nextjs';

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

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
    expect(getByText('Something went wrong.')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it('renders error message when component throws a promise rejection', async () => {
    const error = new Error('Test error');
    const Component = () => Promise.reject(error);
    const { getByText } = render(<MyApp Component={Component} pageProps={{}} />);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(getByText('Something went wrong.')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it('renders error message when component throws a non-Error error', () => {
    const error = 'Test error';
    const Component = () => {
      throw error;
    };
    const { getByText } = render(<MyApp Component={Component} pageProps={{}} />);
    expect(getByText('Something went wrong.')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(new Error('Unknown error'));
  });
});