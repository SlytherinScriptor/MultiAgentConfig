import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';
import * as Sentry from '@sentry/nextjs';

jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
}));

describe('index', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to WebApp')).toBeInTheDocument();
  });

  it('renders error message when component throws an error', () => {
    const error = new Error('Test error');
    const HomeComponent = () => {
      throw error;
    };
    const { getByText } = render(<HomeComponent />);
    expect(getByText('Error occurred')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  it('renders error message when component throws a promise rejection', async () => {
    const error = new Error('Test error');
    const HomeComponent = () => Promise.reject(error);
    const { getByText } = render(<HomeComponent />);
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(getByText('Error occurred')).toBeInTheDocument();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });
});