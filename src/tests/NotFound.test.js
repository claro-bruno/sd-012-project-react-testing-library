import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica NotFound.js', () => {
  test('Testa se página contém um heading', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/erro');

    const notFoundPage = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundPage.localName).toBe('h2');

    expect(notFoundPage).toBeInTheDocument();
  });

  test('Testa se página mostra uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/erro');

    const imagem = screen.getAllByRole('img');
    expect(imagem[1]).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
