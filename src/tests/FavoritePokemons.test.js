import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('testa favorite pokemons', () => {
  it('testa pagina sem pokemons favoritados', () => {
    renderWithRouter(<FavoritePokemons />);
    const texto = screen.getByText('No favorite pokemon found');
    expect(texto).toBeInTheDocument();
  });
  it('testa pokemons favoritados', () => {
    const pokemon = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo:
          'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
        foundAt: [
          {
            location: 'Kanto Viridian Forest',
            map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
          },
          {
            location: 'Kanto Power Plant',
            map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
          },
        ],
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemon } />);
    const pokemonNome = screen.getByTestId('pokemon-name');
    expect(pokemonNome).toBeInTheDocument();
  });
});
