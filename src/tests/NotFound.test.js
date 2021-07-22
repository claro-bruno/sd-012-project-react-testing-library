import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Verifica NotFound', () => {
  test('Testa renderização de h2 e img em notfound', () => {
    renderWithRouter(<NotFound />);

    const SRC_NOTFOUND = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(screen.getByText('Page requested not found')).toBeDefined();
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', SRC_NOTFOUND);
  });
});
