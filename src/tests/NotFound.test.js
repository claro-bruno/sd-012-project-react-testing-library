import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testa a pagina de not Found', () => {
  it('se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/soncerina');
    const notfound = screen.getByText('Page requested not found');
    expect(notfound).toBeInTheDocument();
  });
  it('verifica se tem esta imagem', () => {
    renderWithRouter(<NotFound />);
    const gif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(gif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(gif).toBeInTheDocument();
  });
});
