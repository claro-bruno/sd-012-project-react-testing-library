import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('testa o componente FavoritePokemons.js', () => {
  it('testa se a tela exibe No favorite pokemon found, se nao tiver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('testa se é exibido todos os cards de pokémons favoritados', () => {
    const mokePokemon = {
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
    };
    renderWithRouter(<FavoritePokemons pokemons={ mokePokemon } />);
    // testa se é exibido todos os cards de pokémons favoritados
  });
});
