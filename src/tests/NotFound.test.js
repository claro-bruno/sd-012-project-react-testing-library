import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe('4-Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 c/ o texto Page requested not found', () => {
    const notFoundH2 = screen.getByRole('heading', { level: 2 });
    expect(notFoundH2).toHaveTextContent('Page requested not found');
  });

  test('Teste se a página contém link de imagem de uma Pokédex:', () => {
    const imgNotFound = screen.getAllByRole('img');
    expect(imgNotFound[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
