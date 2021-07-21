import React from 'react';
import { screen } from '@testing-library/react';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  beforeEach(() => {
    const { history } = renderWhitRouter(<App />);
    history.push('pagina-not-found');
  });

  test('Testa se página contém um heading h2', () => {
    const checkh2 = screen.getByRole('heading', { name: /Page requested not found/i });
    const checkImg = screen.getByRole('img', { name: /Crying emoji/i });
    expect(checkh2).toBeInTheDocument();
    expect(checkImg).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem', () => {
    const gif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const checkGif = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(checkGif.src).toBe(gif);
  });
});
