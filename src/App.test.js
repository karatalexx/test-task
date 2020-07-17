import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Check text "Temperature"', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/Temperature:/i);
    expect(textElement).toBeInTheDocument();
});

test('Check text "Air pressure"', () => {
  const { getByText } = render(<App />);
  const textElement = getByText(/Air pressure:/i);
  expect(textElement).toBeInTheDocument();
});

test('Check text "Humidity"', () => {
    const { getByText } = render(<App />);
    const textElement = getByText(/Humidity:/i);
    expect(textElement).toBeInTheDocument();
});