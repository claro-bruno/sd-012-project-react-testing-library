import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente NotFound', () => {
  test('Checks if page content corresponds to expected', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByText('Page requested not found');
    const imageAlt = 'Pikachu crying because the page requested was not found';
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(h2).toBeInTheDocument();
    expect(screen.getByAltText(imageAlt)).toHaveAttribute('src', imageUrl);
  });
});
