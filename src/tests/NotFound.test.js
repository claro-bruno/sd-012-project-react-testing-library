import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa informações do componente NotFound.js', () => {
  it('Testa se página contém heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaestranha');
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading.localName).toBe('h2');
  });

  it('Testa se a página mostra imagem correta', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginaestranha');
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = 'Pikachu crying because the page requested was not found';
    expect(screen.getByRole('img', { name: imgAlt })).toHaveProperty('src', imgURL);
  });
});
