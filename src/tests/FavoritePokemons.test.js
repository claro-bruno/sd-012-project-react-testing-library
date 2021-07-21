import React from 'react';
import { render, screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem de nenhum pokémon favorito', () => {
    render(<FavoritePokemons />);

    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('Testa se é exibido os cards dos pokémons favotitados', () => {
    const mockFavoritePokemons = pokemons;

    renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);

    mockFavoritePokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
