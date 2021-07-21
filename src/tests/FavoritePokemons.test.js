import React from 'react';
import { render, screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  test('Testa se é exibido na tela a mensagem de nenhum pokémon favorito', () => {
    render(<FavoritePokemons />);

    const message = screen.getByText('No favorite pokemon');
    expect(message).toBeInTheDocument();
  });

  test('Testa se é exibido os cards dos pokémons favotitados', () => {
    const mockFavoritePokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: { value: '8.5', measurementUnit: 'kg' },
      },
    ];

    renderWithRouter(<FavoritePokemons pokemons={ mockFavoritePokemons } />);

    mockFavoritePokemons.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});
