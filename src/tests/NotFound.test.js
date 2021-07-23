import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testando o componente "NotFound"', () => {
  it('Testando se a pagina contém um heading "h2" com um texto', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeDefined();
  });

  it('Testando se é exibida a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getAllByRole('img', { src: img });
    expect((image)[1]).toHaveAttribute('src', img); // ? Encontrar forma de pegar a imagem diretamente;
  });
});
