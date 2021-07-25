import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound.js', () => {
  test('Testa se página contem h2 com texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const h2NotFound = screen
      .getByRole('heading', { name: 'Page requested not found Crying emoji' });
    expect(h2NotFound).toBeDefined();
  });

  test('Testa se página mostra imagem do Pikachu chorando', () => {
    renderWithRouter(<NotFound />);
    const gifPath = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByAltText('Pikachu crying because'
    + ' the page requested was not found');
    expect(imgNotFound).toBeDefined();
    const { src } = imgNotFound;
    expect(src).toBe(gifPath);
  });
});
