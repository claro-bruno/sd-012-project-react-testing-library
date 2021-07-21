import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa todo o App.js', () => {
  it('renderiza "Pokédex"', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

});
