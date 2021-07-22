import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('testa pagina Not Found', () => {
  it('testa se tem h2', () => {
    renderWithRouter(<NotFound />);
    const page = /Page requested not found/i;
    const check = screen.getByRole('heading', { name: page });
    expect(check).toBeInTheDocument();
  });
  it('testa se tem imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByAltText(/not found/i);
    expect(image.src).toMatch('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
