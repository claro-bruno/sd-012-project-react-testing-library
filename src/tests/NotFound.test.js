import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa NotFound.js', () => {
  it('Existe H2 com o texto "Page requested not found"', () => {
    const h2Message = /Page requested not found/;
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-encontrada');
    const PageNotFound = screen.getByRole('heading', { name: h2Message, level: 2 });
    expect(PageNotFound).toBeDefined();
  });

  it('Existe imagem na page "NotFound"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-encontrada');
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageAlt = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(imageAlt);
    expect(image.src).toBe(imageURL);
  });
});
