import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';
import App from '../App';

describe('Testa NotFound', () => {
  test('Verifica se a página contém um h2.', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading');
    const TEXT = /Page requested not found/i;
    expect(h2).toHaveTextContent(TEXT);
  });

  test('Verifica se a página contém uma imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/adsadasdsad');
    const SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(screen.getAllByRole('img')[1].src).toBe(SRC);
  })
});
