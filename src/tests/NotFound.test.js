// requisito 4
import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('NotFound tests:', () => {
  test('h2 content', () => {
    renderWithRouter(<NotFound />);
    const content = screen
      .getByRole('heading', { name: /page requested not found crying emoji/i });
    expect(content).toBeInTheDocument();
    expect(content).toHaveTextContent(/page requested not found/i);
  });

  test('Shows the correct img', () => {
    renderWithRouter(<NotFound />);
    const img = screen
      .getByAltText(/pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
