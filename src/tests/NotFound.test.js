import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Teste do componente NotFound.js', () => {
  const imgName = 'Pikachu crying because the page requested was not found';
  const { history } = renderWithRouter(<App />);
  history.push('/not-found');

  const heading = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(heading).toBeInTheDocument();

  const img = screen.getByRole('img', { name: imgName });
  expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
