import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  beforeEach(() => {
    RenderWithRouter(<FavoritePokemons />);
  });
  test('Testa se exibe a tela que nao encontrou pokemon', () => {
    const noFavPokemonsFoundTxt = screen.getByText(/no favorite pokemon found/i);
    expect(noFavPokemonsFoundTxt).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemonArray = [
      {
        averageWeight: {
          measurementUnit: 'kg',
          value: '6.0',
        },
        id: 25,
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        name: 'Pikachu',
        type: 'Electric',
      },
      {
        averageWeight: {
          measurementUnit: 'kg',
          value: '16.5',
        },
        id: 148,
        image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
        name: 'Dragonair',
        type: 'Dragon',
      },
    ];
    RenderWithRouter(<FavoritePokemons pokemons={ pokemonArray } />);
    const pikachu = screen.getByText(/pikachu/i);
    const dragonair = screen.getByText(/dragonair/i);
    expect(pikachu).toBeInTheDocument();
    expect(dragonair).toBeInTheDocument();
  });
});
