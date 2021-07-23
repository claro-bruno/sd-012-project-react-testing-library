import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../etc/renderWithRouter';

describe('NotFound.js', () => {
  it('Heading', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/test');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });

  it('Imagem', () => {
    renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu crying/i);
    expect(img).toHaveAttribute('src', src);
  });
});
