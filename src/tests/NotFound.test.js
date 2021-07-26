import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica elementos do componente NotFound', () => {
  test('Verifica heading h2 em página que não existe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const notFoundMsg = screen.getByText('Page requested not found');
    expect(notFoundMsg).toBeInTheDocument();
    expect(notFoundMsg.localName).toBe('h2');
  });
  test('Verifica se página renderiza imagem esperada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveProperty('src', URL);
  });
});
