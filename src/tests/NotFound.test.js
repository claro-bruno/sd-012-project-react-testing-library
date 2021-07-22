import React from 'react';
import { render, screen } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';
// import App from '../App';

test('Verifica se a pagina exibe o texto correto', () => {
  render(<NotFound />);
  const msg = screen.getByRole('heading');
  expect(msg).toHaveTextContent('Page requested not found 😭');
});

test('Verifica se a pagina exibe a imagem correta', () => {
  const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  render(<NotFound />);
  const img = screen.getAllByRole('img');
  expect(img[1].src).toBe(url);
});
