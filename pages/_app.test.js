import React from 'react';
import { render } from '@testing-library/react';
import MyApp from '../pages/_app';

describe('_app', () => {
  it('renders correctly', () => {
    const { getByText } = render(<MyApp />);
    expect(getByText('Error occurred')).toBeInTheDocument();
  });
});
