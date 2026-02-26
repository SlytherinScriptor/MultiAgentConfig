import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

describe('Home', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to the home page')).toBeInTheDocument();
  });
});