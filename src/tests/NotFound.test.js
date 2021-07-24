import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

beforeEach(() => renderWithRouter(<NotFound />));

describe('Testa o componente NotFound.js', () => {
  it('Testa se página contém um heading h2 com uma determinada mensagem', () => {
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  it('Testa se página mostra determinado gif', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getAllByRole('img');

    expect(image[1]).toHaveAttribute('src', url);
  });
});
