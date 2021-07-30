import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import { NotFound } from '../components';

const URL_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const ALT_IMG = 'Pikachu crying because the page requested was not found';

describe('Testando o componente NotFound', () => {
  it('Verifica se existe um h2 com o texto "Page requested not found"', () => {
    RenderWithRouter(<NotFound />);
    const notFoundMsg = screen.getByText(/Page requested not found/i);
    expect(notFoundMsg).toBeInTheDocument();
  });

  it('Verifica se existe uma imagem na pagina NotFound', () => {
    RenderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: ALT_IMG });
    expect(img).toHaveAttribute('src', URL_IMG);
  });
});
