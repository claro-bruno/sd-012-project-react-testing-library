import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa todo About.js', () => {
  it('renderiza "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingAbout = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(headingAbout).toBeVisible();
  });

});
