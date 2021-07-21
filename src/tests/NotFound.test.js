import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa página NotFound', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina-que-nao-existe');

  const noMatch = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(noMatch).toBeInTheDocument();

  const Image = screen.getAllByRole('img');
  expect(Image[1]).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
