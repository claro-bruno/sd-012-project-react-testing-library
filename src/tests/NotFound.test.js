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
});
