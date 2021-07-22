import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../types/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente App.js', () => {
  test('Verifica se renderiza o texto Page requested not found 😭 em h2', () => {
    const { history } = renderWithRouter(<NotFound />);
    const tagH2 = screen.getByRole('heading', { level: 2 });
    expect(tagH2).toBeInTheDocument();
    expect(tagH2).toHaveTextContent('Page requested not found 😭');
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se a página tem imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    const linkGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image[1].src).toContain(linkGif);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
});
