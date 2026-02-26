import React from 'react';
import { render } from '@testing-library/react';
import Home from '../pages/index';

describe('index', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome to WebApp')).toBeInTheDocument();
  });
});