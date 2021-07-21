import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './helper/renderWithRouter';

describe('Verificando todos os teste de FavoritePokemons', () => {
  beforeEach(() => renderWithRouter(<App />));
  afterEach(() => localStorage.clear());

  it('Testa se "No favorite pokemon found" aparece quando não favorita pokemons', () => {
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByText('No favorite pokemon found')).toBeDefined();
  });

  it('Testa se quando favoritado aparece pokemons', () => {
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByText(/pikachu/i)).toBeDefined();
  });
});
