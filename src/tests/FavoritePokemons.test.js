import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Testa FavoritePokemons', () => {
  test('Verifica se não é encontrado nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const TEXT = /No favorite pokemon found/i;

    expect(screen.getByText(TEXT)).toBeDefined();
  });
});
