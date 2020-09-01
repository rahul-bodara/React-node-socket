import React from 'react';
import { render } from '@testing-library/react';
import Flight from './components/Flight';

test('renders submit link', () => {
  const { getByText } = render(<Flight />);
  //Logout to clear all the data
  const linkElement = getByText(/Logout/i);
  expect(linkElement).toBeInTheDocument();
});


