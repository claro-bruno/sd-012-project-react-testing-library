import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const headingType = screen.getByRole('heading', { level: 2 });
  expect(headingType).toHaveTextContent(/Page requested not found/i);
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<NotFound />);
  const notfoundImage = screen.getAllByRole('img');
  expect(notfoundImage[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});

// pq colocar notfoundImage[1]???
