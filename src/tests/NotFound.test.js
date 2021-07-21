import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa todo o NotFound.js', () => {
  it('renderiza titulo "Page requested..."', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeVisible();
  });

  it('renderiza imagem', () => {
    renderWithRouter(<NotFound />);

    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = screen.getAllByRole('img');
    expect(image[1]).toHaveAttribute('src', IMG_URL);
  });
});
