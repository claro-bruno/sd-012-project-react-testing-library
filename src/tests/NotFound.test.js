import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});
describe('Testando o componente NotFound.js', () => {
  test('Verifica se página contém um h2 com o texto Page requested not found ', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Page requested not found 😭');
  });

  test('Verifica se página mostra a imagem', () => {
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
