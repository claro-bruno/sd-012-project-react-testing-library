import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do <NotFound />', () => {
  test('Testa se página contém heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(heading).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: /Pikachu crying/i });

    expect(img).toHaveAttribute('src', url);
  });
});
