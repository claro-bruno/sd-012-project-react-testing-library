import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 4- Testa componente NotFound', () => {
  it('path errado direciona para pagina notFound com um heading específico', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/fofis');

    const headingName = 'Page requested not found Crying emoji';
    const heading = screen.getByRole('heading', { name: headingName });
    expect(heading).toBeInTheDocument();
  });

  it('pagina notFound contem imagem com src específico', () => {
    const { history } = renderWithRouter(<App />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    history.push('/fofis');

    const imgName = 'Pikachu crying because the page requested was not found';
    const img = screen.getByRole('img', { name: imgName });

    expect(img.src).toBe(url);
  });
});
