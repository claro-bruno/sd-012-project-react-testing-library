import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa NotFound', () => {
  it('Testa se contém heading Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se contém img na página NotFound', () => {
    renderWithRouter(<NotFound />);

    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgComponent = screen.getAllByRole('img');

    expect(imgComponent[1]).toBeInTheDocument();
    expect(imgComponent[1]).toHaveAttribute('src', IMG_URL);
  });
});
