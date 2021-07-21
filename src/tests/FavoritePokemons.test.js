import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const { screen } = require('@testing-library/react');

describe('Testa o componente FavoritePokemon.js', () => {
  it('Testa No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const pokemons = [{
      id: 25,
      name: 'Pikachu',
      type: 'Electric',
      averageWeight: {
        value: '6.0',
        measurementUnit: 'kg',
      },
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
      summary: 'This intelligent Pokémon roasts hard berries with electricity.',
    }];
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
});
