import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Verifica App.test.js', () => {
  test('Verifica se a links na pagina Inicial', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeDefined();
    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeDefined();
    const FavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(FavoritePokemon).toBeDefined();
  });
});
