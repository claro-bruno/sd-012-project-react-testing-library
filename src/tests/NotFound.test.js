import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o NotFound', () => {
  test('Contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagin-nao-existe');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();

    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  test('Teste se página mostra a imagem X', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagin-nao-existe');
    const img = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
