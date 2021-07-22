import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testa NotFound', () => {
  test('Verifica se a página contém um h2.', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading');
    const TEXT = /Page requested not found/i;
    expect(h2).toHaveTextContent(TEXT);
  });
});
