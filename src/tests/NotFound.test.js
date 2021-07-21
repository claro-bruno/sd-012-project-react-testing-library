import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa renderização da page not found', () => {
  it('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-invalida');
    const pageNotFoundHeadingText = screen
      .getByRole('heading', { name: /Page requested not found/i });
    const pageNotFoundHeadingImg = screen
      .getByLabelText('Crying emoji');
    expect(pageNotFoundHeadingText).toBeDefined();
    expect(pageNotFoundHeadingImg).toBeDefined();
  });

  it('Testa se página mostra a imagem do pikachu chorando', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-invalida');
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pageNotFoundImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pageNotFoundImg.src).toBe(imgUrl);
  });
});
