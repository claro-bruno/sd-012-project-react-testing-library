import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { NotFound } from '../components';

describe('Testa componente Not Found', () => {
  it('Verifica se página contém heading h2', () => {
    renderWithRouter(<NotFound />);
    const head = screen.getByRole('heading', { name: /Page requested not found/i });
    // const { pathname } = history.location;
    // history.push('/pagina-nao-encontrada');
    // expect(pathname).toBe('/pagina-nao-encontrada');
    expect(head).toBeDefined();
  });

  it('Verifica se a imagem do pikachu é mostrada', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(image).toBeDefined();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
